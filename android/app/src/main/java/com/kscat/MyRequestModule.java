package com.kscat;

import com.facebook.react.bridge.*;
import okhttp3.*;

import javax.net.ssl.*;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

/**
 * Created by Administrator on 2016/8/15.
 */
public class MyRequestModule extends ReactContextBaseJavaModule {
    public MyRequestModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyRequest";
    }

    @ReactMethod
    public void request(String url, ReadableMap raw, Promise promise){
        try {
            promise.resolve(post(url, raw));
        } catch (Exception e) {
            promise.reject(e.getMessage());
        }
    }

    public  static String cookie="";
    String post(String url, ReadableMap raw) throws IOException, NoSuchAlgorithmException, KeyManagementException {
        OkHttpClient client = new OkHttpClient();

        RequestBody formBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), raw.getString("body"));
        ReadableMap headers = raw.getMap("headers");
        Request.Builder requestBuilder = new Request.Builder().url(url);
        if(url.indexOf("http://58.213.69.194:3080/jktool")>-1&&cookie!=null&&cookie!="") {
            requestBuilder = requestBuilder.addHeader("Cookie", cookie);
        }
        ReadableMapKeySetIterator iterator = headers.keySetIterator();
        while(iterator.hasNextKey()){
            String key = iterator.nextKey();
            requestBuilder = requestBuilder.addHeader(key, headers.getString(key));
        };
        Request request = requestBuilder.post(formBody).build();

        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, new TrustManager[]{new X509TrustManager() {
            @Override
            public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {

            }

            @Override
            public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {

            }

            @Override
            public X509Certificate[] getAcceptedIssuers() {
                X509Certificate[] x509Certificates = new X509Certificate[0];
                return x509Certificates;
            }
        }}, new SecureRandom());

        OkHttpClient.Builder builder = client.newBuilder().sslSocketFactory(sc.getSocketFactory());
        builder.hostnameVerifier(new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        });
        Response response = builder.build().newCall(request).execute();
        if (response.isSuccessful()) {
            System.out.println("=============="+response.header("set-cookie"));
            System.out.println("=============="+response.headers().toString());
            if(url.indexOf("https://58.213.69.194:3445/jktool/cas")>-1)
            cookie=response.header("set-cookie");

            return response.body().string();
        } else {
            throw new IOException("Unexpected code " + response);
        }
    }
}
