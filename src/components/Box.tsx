import { animate, motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { DragWord } from "@/type";

const Box = (props: DragWord) => {
  const ref = useRef<HTMLDivElement>(null);

  function resetPosition() {
    //TODO: Nếu kéo sai, từ gợi ý sẽ quay trở lại vị trí ban đầu
    if (ref.current) {
      animate(ref.current, { x: 0, y: 0 });
    }
  }

  function onDragCorrect(element: HTMLInputElement) {
    element.value = props.word;
    //TODO: Sau khi kéo thả đúng, ô input sẽ tự động nhận giá trị và không thể thay đổi
    element.disabled = true;
    if (element.nextElementSibling) {
      element.nextElementSibling.textContent = props.word;
    }
    //TODO: Ẩn từ gợi ý
    if (ref.current) {
      ref.current.style.opacity = "0";
      ref.current.style.visibility = "hidden";
    }
  }
  function onDragEnd(e: MouseEvent) {
    const element = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((item) => item.id === props.word) as HTMLInputElement;

    //TODO: Sai vị trí
    if (!element) {
      resetPosition();
      return;
    }
    onDragCorrect(element);
  }

  return (
    <motion.div ref={ref} drag onDragEnd={onDragEnd} dragMomentum={false}>
      <Button
        variant="outline"
        style={{
          color: props.color
        }}>
        {props.word}
      </Button>
    </motion.div>
  );
};

export default Box;
