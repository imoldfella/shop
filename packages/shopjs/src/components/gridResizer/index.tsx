import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import { throttle } from '@solid-primitives/scheduled';

export const Dot: Component<{ isDragging: boolean }> = (props) => {
  return (
    <span
      class=" m-1 h-1 w-1 rounded-full bg-slate-300 dark:bg-white dark:group-hover:bg-slate-200"
      classList={{
        'bg-slate-200': props.isDragging,
        'dark:bg-slate-200': props.isDragging,
      }}
    />
  );
};

type SolidRef = (el: HTMLDivElement) => void;
export const GridResizer: Component<{
  ref: HTMLDivElement | SolidRef;
  onResize: (clientX: number, clientY: number) => void;
}> = (props) => {
  const [isDragging, setIsDragging] = createSignal(false);

  const onResizeStart = () => setIsDragging(true);
  const onResizeEnd = () => setIsDragging(false);

  const onMouseMove = throttle((e: MouseEvent) => {
    props.onResize(e.clientX, e.clientY);
  }, 10);

  const onTouchMove = throttle((e: TouchEvent) => {
    const touch = e.touches[0];
    props.onResize(touch.clientX, touch.clientY);
  }, 10);

  const setRef = (el: HTMLDivElement) => {
    (props.ref as SolidRef)(el);

    el.addEventListener('mousedown', onResizeStart);
    el.addEventListener('touchstart', onResizeStart);

    onCleanup(() => {
      el.removeEventListener('mousedown', onResizeStart);
      el.removeEventListener('touchstart', onResizeStart);
    });
  };

  createEffect(() => {
    if (isDragging()) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onResizeEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onResizeEnd);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onResizeEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onResizeEnd);
    }
  });

  return (
    <div
      ref={setRef}
      class="hover:bg-white  group flex items-center justify-center flex-col cursor-col-resize dark:border-neutral-800 bg-black"
      classList={{
        'bg-black dark:white': isDragging(),
        'bg-white dark:bg-black ': !isDragging(),
      }}
    >
      <div
        class='cursor-col-resize'
        classList={{
          'fixed inset-0 z-10': isDragging(),
          'hidden': !isDragging(),
        }}
      />
      <Dot isDragging={isDragging()} />
      <Dot isDragging={isDragging()} />
      <Dot isDragging={isDragging()} />
    </div>
  );
};


// 

