import { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { GestureEvent, PinchGestureHandlerEventPayload } from 'react-native-gesture-handler';

export const usePinchGesture = () => {
  const pinchRef = useRef(null);
  const [zoom, setZoom] = useState(0);

  const onPinchGestureEvent = (e: GestureEvent<PinchGestureHandlerEventPayload>) => {
    const scale = e.nativeEvent.scale;
    const velocity = e.nativeEvent.velocity / 20;

    let newZoom =
      velocity > 0
        ? zoom + scale * velocity * (Platform.OS === 'ios' ? 0.01 : 25)
        : zoom - scale * Math.abs(velocity) * (Platform.OS === 'ios' ? 0.02 : 50);

    if (newZoom < 0) newZoom = 0;
    else if (newZoom > 0.5) newZoom = 0.5;

    setZoom(newZoom);
  };

  return {
    pinchRef,
    zoom,
    onPinchGestureEvent,
  };
};
