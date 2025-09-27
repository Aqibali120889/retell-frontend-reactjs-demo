import { useEffect, useState, useCallback } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

interface RegisterCallResponse {
  access_token: string;
}

interface UseRetellReturn {
  isCalling: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  toggleCall: () => Promise<void>;
  client: RetellWebClient;
}

const agentId = "ENTER_YOUR_AGENT_ID";

export const useRetell = (): UseRetellReturn => {
  const [client] = useState(() => new RetellWebClient());
  const [isCalling, setIsCalling] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Call started
    client.on('call_started', () => {
      console.log('Call started');
      setIsListening(true);
    });

    // Call ended
    client.on('call_ended', () => {
      console.log('Call ended');
      setIsCalling(false);
      setIsListening(false);
      setIsSpeaking(false);
    });

    // Agent starts talking - for robot speaking animation
    client.on('agent_start_talking', () => {
      console.log('Agent start talking');
      setIsSpeaking(true);
      setIsListening(false);
    });

    // Agent stops talking - back to listening state
    client.on('agent_stop_talking', () => {
      console.log('Agent stop talking');
      setIsSpeaking(false);
      setIsListening(true);
    });

    // Update transcript
    client.on('update', (update) => {
      if (update.transcript) {
        setTranscript(update.transcript);
      }
    });

    // Error handling
    client.on('error', (error) => {
      console.error('Retell error:', error);
      client.stopCall();
      setIsCalling(false);
      setIsListening(false);
      setIsSpeaking(false);
    });

    return () => {
      client.stopCall();
    };
  }, [client]);

  const registerCall = useCallback(async (agentId: string): Promise<RegisterCallResponse> => {
    try {
      const response = await fetch('http://localhost:8080/create-web-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error registering call:', error);
      throw error;
    }
  }, []);

  const toggleCall = useCallback(async () => {
    if (isCalling) {
      client.stopCall();
    } else {
      try {
        const registerCallResponse = await registerCall(agentId);
        if (registerCallResponse.access_token) {
          await client.startCall({
            accessToken: registerCallResponse.access_token,
          });
          setIsCalling(true);
        }
      } catch (error) {
        console.error('Error starting call:', error);
      }
    }
  }, [isCalling, client, registerCall]);

  return {
    isCalling,
    isListening,
    isSpeaking,
    transcript,
    toggleCall,
    client,
  };
};