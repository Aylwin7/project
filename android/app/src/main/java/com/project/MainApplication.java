package com.project;

import android.app.Application;
import com.facebook.react.ReactApplication;
// import org.reactnative.camera.RNCameraPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
// import com.oblador.vectoricons.VectorIconsPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.evollu.react.fcm.FIRMessagingPackage;
import java.util.Arrays;
import java.util.List;
// import com.lwansbrough.RCTCamera.*;

import com.project.IMEIPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          // new RCTCameraPackage(),
            new FIRMessagingPackage(),
          // new MapsPackage(),
          // new FIRMessagingPackage(),  
            // new VectorIconsPackage(),
            new RNExitAppPackage(),
            new IMEIPackage()
            
            // new EXGetSN()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
