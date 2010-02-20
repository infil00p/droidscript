package comikit.droidscript;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Central place to store info.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * Source code license: MIT
 */
public class DroidScript
{
    static Log MessageLog = new Log();
    
    public static void log(String message)
    {
        MessageLog.add(message);
    }
    
    static class Log
    {
        List<String> log = new CopyOnWriteArrayList<String>();
        
        public String getLastMessage()
        {
            return log.get(log.size() - 1);
        }
        
        public List<String> getMessages()
        {
            return log;
        }
        
        public int getNumberOfMessages()
        {
            return log.size();
        }
        
        public void add(String message)
        {
            log.add(message);
        }
        
        public void clear()
        {
            log.clear();
            // Alternatively: log = new CopyOnWriteArrayList<String>();
        }
    }
}
