declare namespace type {

    /**
     * code: src/core/graphics.js
     */

    class Point {
        x: number
        y: number
        constructor(x: number, y: number)
        copy(): Point
        add(p: Point): void
        setPoint(x: number, y: number): void
        setPoint2(p: Point): void
        quantize(): void
    }

    class Points {
        constructor()
        clear(): void
        copy(): Points
        assigns(pts: Points): void
        add(p: Point): void
        insert(index: number, p: Point): void
        remove(index: number): void
        setPoint(index: number, p: Point): void
        setPoint2(index: number, x: number, y: number): void
        getPoint(index: number): Point
        getXPoints(): Array<number>
        getYPoints(): Array<number>
        count(): number
        reduceOrthoLine(): void
        reduceLine(): void
        isRectilinear(): boolean
        convObliqueToRectilinear(): void
        getBoundingRect(): Rect
        quantize(): void
    }

    class Rect {
        x1: number
        y1: number
        x2: number
        y2: number
        constructor(x1: number, y1: number, x2: number, y2: number)
        copy(): Rect
        add(p: Point): void
        setRect(x1: number, y1: number, x2: number, y2: number): void
        setRect2(r: Rect): void
        setRect3(p1: Point, p2: Point): void
        expand(delta: number): void
        union(r: Rect): Rect
        getCenter(): Point
        getWidth(): number
        getHeight(): number
        getRatioPercent(): number
        quantize(): void
    }

    enum FontStyle {
        FS_NORMAL = 0,
        FS_BOLD = 1,
        FS_ITALIC = 2,
        FS_BOLD_ITALIC = 3
    }

    class Font {
        face: string
        size: number
        style: FontStyle
        constructor(face: string, size: number, style: FontStyle)
        set(face: string, size: number, style: FontStyle)
        assign(font: Font): void
        copy(): Font
    }

}

