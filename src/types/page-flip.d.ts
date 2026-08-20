declare module 'page-flip' {
  export type FlipCorner = 'top' | 'bottom'

  export interface PageFlipEvent<T = unknown> {
    data: T
    object: PageFlip
  }

  export interface PageFlipSettings {
    width: number
    height: number
    size?: 'fixed' | 'stretch'
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    drawShadow?: boolean
    flippingTime?: number
    usePortrait?: boolean
    startZIndex?: number
    autoSize?: boolean
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    clickEventForward?: boolean
    useMouseEvents?: boolean
    swipeDistance?: number
    showPageCorners?: boolean
    disableFlipByClick?: boolean
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings)

    on<T = unknown>(event: string, callback: (event: PageFlipEvent<T>) => void): this
    destroy(): void
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void
    flipNext(corner?: FlipCorner): void
    turnToPage(pageNumber: number): void
    getCurrentPageIndex(): number
  }
}
