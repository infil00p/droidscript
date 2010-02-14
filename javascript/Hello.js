// adb push Hello.js /data/data/miki.rhinodroid/files/
var TextView = Packages.android.widget.TextView;
var view = new TextView(TheActivity);
var text = '2009-12-08 Hello Android!\nThis is JavaScript in action!';
view.setText(text);
//TheContentView.removeAllViews();
//TheContentView.addView(view);
TheActivity.setContentView(view);