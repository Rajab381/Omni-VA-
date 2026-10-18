/**
 * Native Web Speech API integration for Free TTS & STT
 * Runs 100% in-browser with zero paid API or token costs.
 */

export interface ISpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

export interface ISpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}

export interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: ISpeechRecognitionConstructor;
    webkitSpeechRecognition?: ISpeechRecognitionConstructor;
  }
}

export class WebSpeechController {
  private synth: SpeechSynthesis | null = null;
  private recognition: ISpeechRecognitionInstance | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.synth = window.speechSynthesis || null;
      const SpeechRecognitionClass =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "en-US";
      }
    }
  }

  public speak(
    text: string,
    onBoundary?: (charIndex: number) => void,
    onEnd?: () => void
  ) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any pending utterance

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    if (onBoundary) {
      utterance.onboundary = (event) => {
        onBoundary(event.charIndex);
      };
    }

    if (onEnd) {
      utterance.onend = () => {
        onEnd();
      };
    }

    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public startListening(
    onResult: (transcript: string) => void,
    onError?: (error: unknown) => void
  ) {
    if (!this.recognition) {
      console.warn("SpeechRecognition is not supported on this browser.");
      return;
    }

    this.recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    if (onError) {
      this.recognition.onerror = onError;
    }

    this.recognition.start();
  }

  public stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

export const speechController = new WebSpeechController();
