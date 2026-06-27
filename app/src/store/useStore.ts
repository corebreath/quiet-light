import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

export type WeatherState = 'sunny' | 'partlyCloudy' | 'stormy' | 'foggy' | 'windy';
export type EchoAnswer = 'mine' | 'notMine' | 'unsure';

export interface AppState {
  childName: string;
  characterId: string;
  onboardingComplete: boolean;
  lightBrightness: number;        // 0–100, grows with practice
  currentWeather: WeatherState;
  totalSessions: number;
  lastPracticeDate: string | null;
  echoEntries: Array<{ date: string; answer: EchoAnswer; label: string }>;
  chaptersComplete: string[];
}

const DEFAULTS: AppState = {
  childName: '',
  characterId: 'a',
  onboardingComplete: false,
  lightBrightness: 20,
  currentWeather: 'partlyCloudy',
  totalSessions: 0,
  lastPracticeDate: null,
  echoEntries: [],
  chaptersComplete: [],
};

const KEY = 'ql_state_v1';

export function useStore() {
  const [state, setState] = useState<AppState>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        try {
          setState({ ...DEFAULTS, ...JSON.parse(raw) });
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  const update = useCallback((patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const completeSession = useCallback(() => {
    setState((prev) => {
      const brightness = Math.min(100, prev.lightBrightness + 2);
      const next = {
        ...prev,
        lightBrightness: brightness,
        totalSessions: prev.totalSessions + 1,
        lastPracticeDate: new Date().toISOString().split('T')[0],
      };
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addEchoEntry = useCallback((answer: EchoAnswer, label: string) => {
    setState((prev) => {
      const entry = { date: new Date().toISOString().split('T')[0], answer, label };
      const next = { ...prev, echoEntries: [entry, ...prev.echoEntries].slice(0, 90) };
      AsyncStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { state, loaded, update, completeSession, addEchoEntry };
}
