import { Component, Fragment } from "comer";
import { DOMComponent } from "../DOMComponent";
import { DOMEventProps, DOMText } from "../DOMTypes";

export * from "./Generated.html";
export * from "./Generated.svg";

export class TextNode extends DOMComponent<
  DOMText,
  { textContent: string },
  TextNode
> {
  type = "text_node";
  constructor(textContent: string) {
    super({ textContent });
  }
  build(): Component {
    return new Fragment();
  }
}

export const Text = TextNode;
export const TextContent = TextNode;

export class Video extends DOMComponent<
  HTMLVideoElement,
  Partial<DOMEventProps<HTMLVideoElementEventMap>>,
  Video
> {
  type = "video";
}

export class Audio extends DOMComponent<
  HTMLAudioElement,
  Partial<DOMEventProps<HTMLVideoElementEventMap>>,
  Audio
> {
  type = "audio";
}
