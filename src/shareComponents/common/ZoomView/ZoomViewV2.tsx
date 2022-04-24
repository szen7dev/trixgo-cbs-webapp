/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { ModalFullContainer } from "../ModalFullContainer";
import { PostState } from "./contexts/ContextPost/post.state";
import { Event, eventManager } from "./core/eventManager";
import ViewPost from "./ViewPost";

let queue: any[] = [];
let isMounted = false;

function dispatchEvent(event: Event, ...args: any[]) {
  if (isMounted) {
    eventManager.emit(event as any, args[0]);
  } else if (event === Event.Show) {
    queue.push(args);
  }
}

export function zoomview(params: PostState): void {
  dispatchEvent(Event.Show, params);
}
zoomview.show = (params: PostState): void => {
  dispatchEvent(Event.Show, params);
};
zoomview.close = (): void => {
  dispatchEvent(Event.Close);
};
zoomview.toggle = (): void => {
  dispatchEvent(Event.Toggle);
};

/**
 * Wait until the ToastContainer is mounted to dispatch modal
 * and attach isActive method
 */
eventManager
  .on(Event.DidMount, () => {
    isMounted = true;
    queue.forEach((item) => {
      eventManager.emit(Event.Show, item);
    });
    queue = [];
  })
  .on(Event.WillUnmount, () => {
    isMounted = false;
    eventManager
      .off(Event.Show)
      .off(Event.Toggle)
      .off(Event.Close)
      .off(Event.Clear)
      .off(Event.ClearWaitingQueue);
  });

const ZoomViewV2 = (): JSX.Element => {
  const [isShow, setIsShow] = useState(false);
  const [state, setState] = useState<PostState>();
  useEffect(() => {
    eventManager
      .on(Event.Show, show)
      .on(Event.Close, close)
      .on(Event.Toggle, toggle)
      .emit(Event.DidMount);
    return () => eventManager.emit(Event.WillUnmount);
  }, []);

  function show(data: PostState): void {
    setState(data);
    setIsShow(true);
  }
  function close() {
    setIsShow(false);
  }

  function toggle() {
    setIsShow((show) => !show);
  }

  return (
    <ModalFullContainer isModalOpen={isShow && !!state} toggle={toggle}>
      <div className="flex overflow-hidden transition-all transform w-full h-full">
        <ViewPost toggle={toggle} initialData={state as PostState} />
      </div>
    </ModalFullContainer>
  );
};

export default ZoomViewV2;
