package com.virtualmentor.voice.provider;

public interface VoiceProviderFactory {

    VoiceProvider getProvider(String provider);
}