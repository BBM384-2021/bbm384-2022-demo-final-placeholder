package Placeholder.backend.DAO;

import Placeholder.backend.Model.*;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.*;

public class EventDAO {


    public static SessionFactory createFactory(){
        return new Configuration().
                configure("hibernate.cfg.xml").
                addAnnotatedClass(Event.class).addAnnotatedClass(Attend.class).addAnnotatedClass(User.class).addAnnotatedClass(Connection.class).
                buildSessionFactory();
    }

    private static void extractEventList( HashMap<String,Object> result, List<Object> queryResult, String currentUserId, HashSet<Integer> addedBefore) {

        List<Object> eventsOwned = new ArrayList<>();
        List<Object> participatingEvents = new ArrayList<>();
        List<Object> nonParticipatingEvents = new ArrayList<>();


        Gson gson = new Gson();
        if (queryResult.size() != 0) {
            JsonParser jsonParser = new JsonParser();

            HashSet<Integer> eventIdSet = new HashSet<>();

            Event prevEvent = null;
            User prevUser = null;
            List<User> currentParticipants = null;

            boolean participating = false;

            for(Object o : queryResult) {
                String jsonStr = gson.toJson(o);
                JsonArray jsonArray = (JsonArray) jsonParser.parse(jsonStr);

                Event currentEvent = gson.fromJson(jsonArray.get(0), Event.class);
                if(addedBefore.contains(currentEvent.getId())){
                    continue;
                }
                User currentUser = gson.fromJson(jsonArray.get(1),User.class);

                if(!eventIdSet.contains(currentEvent.getId())){

                    if(prevEvent != null){
                        HashMap<String,Object> currentEventWithData = new HashMap<>();
                        currentEventWithData.put("event",prevEvent);
                        currentEventWithData.put("participants", currentParticipants);
                        currentEventWithData.put("user",prevUser);

                        if(Integer.toString(currentUser.getId()).equals(currentUserId)){
                            eventsOwned.add(currentEventWithData);
                        }
                        else if(participating){
                            participatingEvents.add(currentEventWithData);
                        }
                        else{
                            nonParticipatingEvents.add(currentEventWithData);
                        }
                        addedBefore.add(prevEvent.getId());
                    }

                    currentParticipants = new ArrayList<>();
                    prevEvent = currentEvent;
                    prevUser = currentUser;
                    eventIdSet.add(currentEvent.getId());
                    participating = false;
                }

                User participant = null;

                try{
                    participant = gson.fromJson(jsonArray.get(3),User.class);
                    if(Integer.toString(participant.getId()).equals(currentUserId)){
                        participating = true;
                    }
                }
                catch (Exception e){

                }

                if(participant != null){
                    currentParticipants.add(participant);
                }
            }

            if(prevUser != null){


                HashMap<String,Object> currentEventWithData = new HashMap<>();
                currentEventWithData.put("event",prevEvent);
                currentEventWithData.put("participants", currentParticipants);
                currentEventWithData.put("user",prevUser);
                if(Integer.toString(prevUser.getId()).equals(currentUserId)){
                    eventsOwned.add(currentEventWithData);
                }
                else if(participating){
                    participatingEvents.add(currentEventWithData);
                }
                else{
                    nonParticipatingEvents.add(currentEventWithData);
                }
                addedBefore.add(prevEvent.getId());
                Collections.reverse(eventsOwned);
                Collections.reverse(participatingEvents);
                Collections.reverse(nonParticipatingEvents);

            }
        }
        if(!result.containsKey("eventsOwned")){
            result.put("eventsOwned",eventsOwned);
        }
        else{
            List<Object> currentList = (List<Object>) result.get("eventsOwned");
            currentList.addAll(eventsOwned);
            result.put("eventsOwned",currentList);
        }
        if(!result.containsKey("participatingEvents")){
            result.put("participatingEvents",participatingEvents);
        }
        else{
            List<Object> currentList = (List<Object>) result.get("participatingEvents");
            currentList.addAll(participatingEvents);
            result.put("participatingEvents",currentList);
        }
        if(!result.containsKey("nonParticipatingEvents")){
            result.put("nonParticipatingEvents",nonParticipatingEvents);
        }
        else{
            List<Object> currentList = (List<Object>) result.get("nonParticipatingEvents");
            currentList.addAll(nonParticipatingEvents);
            result.put("nonParticipatingEvents",currentList);
        }
    }

    public static Event createEvent(Event event){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        List<Event> events;
        try{
            session.beginTransaction();
            session.save(event);
            events = session.createQuery(String.format("from Event e WHERE e.user_id = '%s' and e.event_share_date = '%s'",event.getUser_id(),event.getEvent_share_date())).getResultList();
            if(events.size() == 0){
                session.getTransaction().commit();
                return null;
            }
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }
        return events.get(events.size()-1);
    }


    public static int updateEvent(Event event){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("update Event e SET e.event_body = '%s' , e.event_visual_data_path = '%s', e.event_location = '%s', e.start_date = '%s', e.end_date = '%s' WHERE e.id = '%s'",event.getEvent_body(),event.getEvent_visual_data_path(),event.getEvent_location(),event.getStart_date(),event.getEnd_date(),event.getId())).executeUpdate();
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;

    }

    public static int deleteEvent(String eventId){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();
        try{
            session.beginTransaction();
            session.createQuery("delete from Event e where e.id = "+eventId).executeUpdate();
            session.getTransaction().commit();
            EventDAO.deleteAllParticipantsFromAnEvent(eventId);
        }
        catch (Exception e){
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;
    }

    public static HashMap<String,Object> getAllEventsOfAUser(String user_id, String current_user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        HashMap<String,Object> result = new HashMap<>();
        List<Object> queryResult;
        try{
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Event e " +
                    "INNER JOIN User u ON u.id = e.user_id " +
                    "LEFT JOIN Attend at ON e.id = at.event_id " +
                    "LEFT JOIN User cu ON at.user_id = cu.id WHERE e.user_id = '%s'",user_id)).getResultList();
            extractEventList(result, queryResult, current_user_id,new HashSet<Integer>());
            session.getTransaction().commit();

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return result;
    }

    public static HashMap<String,Object> getMainFeed(String current_user_id){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        HashMap<String,Object> result = new HashMap<>();
        List<Object> queryResult;
        try{
            HashSet<Integer> addedBefore= new HashSet<Integer>();
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Event e " +
                    "INNER JOIN User u ON u.id = e.user_id " +
                    "LEFT JOIN Attend at ON e.id = at.event_id " +
                    "LEFT JOIN User cu ON at.user_id = cu.id " +
                    "INNER JOIN Connection c ON (c.user1_id = '%s' and c.user2_id = u.id)",current_user_id)).getResultList();
            extractEventList(result, queryResult, current_user_id,addedBefore);
            session.getTransaction().commit();

            session = factory.getCurrentSession();
            session.beginTransaction();
            queryResult = session.createQuery(String.format("from Event e " +
                    "INNER JOIN User u ON u.id = e.user_id " +
                    "LEFT JOIN Attend at ON e.id = at.event_id " +
                    "LEFT JOIN User cu ON at.user_id = cu.id " )).getResultList();
            extractEventList(result, queryResult, current_user_id,addedBefore);
            session.getTransaction().commit();

        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return result;
    }

    public static int participateEvent(Attend attend){

        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.save(attend);
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }
        return 200;

    }

    public static int cancelParticipation(Attend attend){


        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Attend at where at.user_id = '%s' and at.event_id = '%s' ",attend.getUser_id(),attend.getEvent_id())).executeUpdate();
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;
    }

    public static int deleteAllParticipantsFromAnEvent(String eventId){


        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        try{
            session.beginTransaction();
            session.createQuery(String.format("delete from Attend at where at.event_id = '%s' ",eventId)).executeUpdate();
            session.getTransaction().commit();
        }
        catch (Exception e){
            factory.close();
            System.out.println(e);
            return 400;
        }
        finally {
            factory.close();
        }

        return 200;
    }

    public static List<Attend> getAllAttend(){
        SessionFactory factory = createFactory();
        Session session = factory.getCurrentSession();

        List<Attend> allAttend;
        try{
            session.beginTransaction();
            allAttend = session.createQuery("from Attend at").getResultList();
            session.getTransaction().commit();
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        finally {
            factory.close();
        }

        return allAttend;
    }






}
