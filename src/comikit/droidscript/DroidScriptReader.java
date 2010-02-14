package comikit.droidscript;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

import android.app.Activity;
import android.os.Environment;

/**
 * Helper class for reading text files from various sources.
 * @author Mikael Kindborg
 * Email: mikael.kindborg@gmail.com
 * Blog: divineprogrammer@blogspot.com
 * Twitter: @divineprog
 * Copyright (c) Mikael Kindborg 2010
 * License: MIT
 */
public class DroidScriptReader 
{
    private DroidScriptReader()
    {
    }
    
    public static DroidScriptReader create()
    {
        return new DroidScriptReader();
    }
    
    public String readStringFromFileOrUrl(String fileOrUrl) throws Exception
    {
        if (fileOrUrl.startsWith("http://"))
        {
            return readString(openUrl(fileOrUrl));
        }
        else
        {
            return readString(openExternalStorageFile(fileOrUrl));
        }
    }

    public String readStringFromApplicationFile(Activity activity, String filename) throws Exception
    {
         return readString(openApplicationFile(activity, filename));
    }
    
    public InputStream openApplicationFile(Activity activity, String filename) throws Exception
    {
        return activity.openFileInput(filename);
    }

    public InputStream openExternalStorageFile(String filename) throws Exception
    {
        // Might be useful: content://com.android.htmlfileprovider/sdcard/example/file.html
        return new FileInputStream(
                new File(Environment.getExternalStorageDirectory() + "/" + filename));
    }

    public InputStream openUrl(String url) throws Exception
    {
            return new URL(url).openStream();
    }
    
    public String readString(InputStream stream) throws Exception
    {
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        StringBuffer dataBuf = new StringBuffer();
        while (true)
        {
            String data = reader.readLine();
            if (null == data)  { break; }
            dataBuf.append(data + "\n");
        }
        
        reader.close();
        stream.close();
        
        return dataBuf.toString();
    }
    
    public String readStringRaw(InputStream stream) throws Exception
    {
        BufferedInputStream bufIn = new BufferedInputStream(stream);
        StringBuffer dataBuf = new StringBuffer();
        while (true)
        {
            int data = bufIn.read();
            if (data == -1)
            {
                break;
            }
            else
            {
                dataBuf.append((char) data);
            }
        }
        
        bufIn.close();
        stream.close();
        
        return dataBuf.toString();
    }
}
