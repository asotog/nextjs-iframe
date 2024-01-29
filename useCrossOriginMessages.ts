import { useCallback, useEffect, useState } from "react";

export interface CrossOriginMessage {
  type: string;
  message: any;
  source?: "@app-name";
}

export function useCrossOriginMessages() {
  const [hostMessage, setHostMessage] = useState<CrossOriginMessage>();

  const postMessage = useCallback(({ type, message }: CrossOriginMessage) => {
    console.log("guest sending", { type, message });
    window.parent.postMessage({
      type,
      message,
      source: "@app-name",
    });
  }, []);

  useEffect(() => {
    /**
     * Be carefull, this captures any message, we need to filter
     * @param event
     */
    const onMessage = (event: MessageEvent<CrossOriginMessage>) => {
      // Do we trust the sender of this message?  (might be
      // different from what we originally opened, for example).
      //  if (event.origin !== "http://example.com") return;
      if (
        event.data?.source !== "@app-name" ||
        event.origin === window.location.origin
      )
        return;
      setHostMessage(event.data);
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return { postMessage, hostMessage };
}
