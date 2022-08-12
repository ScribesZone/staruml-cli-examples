declare namespace type {

    /**
     * code: src/core/core.js
     */


    type Color = `#${string}`

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#element
     */
    class Element {
        _id: string
        _parent: Element | null   // [from card 0..1]
        getDisplayClassName(): string
        getClass(): Type
        getClassName(): TypeName
        getMetaClass(): MetaClass
        getMetaAttributes(): Array<MetaAttribute>
        getParentField(): string
        getNodeIcon(): string
        getNodeText(options: object): string
        getOrdering(index: number): number
        getChildNodes(sort: boolean): Array<Element>
        getChildren(): Array<Element>
        traverse(fun: (e: Element) => void): void
        traverseDepthFirst(fun: (element: Element) => void): void
        traverseField(field: string, fun: (element: Element) => void): void
        traverseFieldDepthFirst(field: string, fun: (element: Element) => void): void
        traverseUp(fun: (element: Element) => void): void
        lookup(name: string, typeFilter: Type, namespace: Element): Element | null  // [from code]
        findByName(name: string | Array<String>): Element | null // [from code]
        lookdown(pathName: Array<string>): Element | null // [from code]
        isOneOfTheContainers(elem: Element): boolean
        canContainKind(kind: string): boolean
        canContain(elem: Element): boolean
        canCopy(): boolean
        canDelete(): boolean
        canHide(): boolean
        canPaste(kind: string, copyContext: { field: string }): boolean

        // static fields
        static getSuperType(subType: Type): Type | null  // [from code]
        static getCommonType(elems: Array<Element>): Type | null // [from code]
        static findByName(array: Array<Element>, name: string): Element | null // [from code]
        static getNewName(array: Array<Element>, prefix: string): string
        static mergeProps(elems: Array<Element>, prop: string): any | null // ??? return type
    }

    // defined for the API
    type ElementPredicate = (e: Element) => boolean

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#model
     */
    class Model extends Element {
        name: string
        ownedElements: Array<Element>
        getViewType(): Type
        getPath(base: Model): Array<string>
        getPathName(): string
        canContain(elem: Element): boolean
        canContainDiagramKind(kind: string): boolean
        canContainDiagram(diagram: Diagram): boolean
        canRelocateTo(model: Model): boolean
    }

    /**
     * [Tag.TK_] enumeration with string literals
     */
    enum TagKind {
        string = "string",
        reference = "reference",
        boolean = "boolean",
        number = 'number'
    }

    /**
     * code: src/core/core.js
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#model
     */
    class Tag extends Model {
        kind: TagKind
        value: any
        reference: Model
        checked: boolean
        number: number
        hidden: boolean   // ??? in code, not private, but not un doc api
        toString(showHidden: boolean): string
        getValueString(): string | null
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#hyperlink
     */
    class Hyperlink extends Model {
        reference: Model
        url: string // ??? code says : @member {*}
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#extensiblemodel
     */
    class ExtensibleModel extends Model {
        documentation: string
        tags: Array<Tag>
        hasTag(tagName: string): boolean
        getTag(tagName: string): Tag | undefined // [from code]
        getTagValue(tagName: string): any | undefined  // [from code]
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#relationship
     */
    class Relationship extends ExtensibleModel {
        // no fields
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#directedrelationship
     */
    class DirectedRelationship extends Relationship {
        target: Model // [from card 1]
        source: Model // [from card 1]
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#relationshipend
     */
    class RelationshipEnd extends ExtensibleModel {
        reference: Model // [from card 1]
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#undirectedrelationship
     */
    class UndirectedRelationship extends Relationship {
        end1: RelationshipEnd // [from card 1]
        end2: RelationshipEnd // [from card 1]
    }

    /**
     * SK_
     */
    enum SelectableViewKind {
        no = 0,
        yes = 1,
        propagate = 2
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#view
     */
    class View {
        model: Model | null   // [from card 0..1]
        subViews: Array<View>
        containerView: View | null // [from card 0..1]   // inverse of View.containedViews
        containedViews: Array<View>  // inverse of View.containerView
        visible: boolean
        enabled: boolean
        selected: boolean
        selectable: SelectableViewKind  // [enum SK_]
        lineColor: Color
        fillColor: Color
        fontColor: Color
        font: Font
        // ??? private parentStyle: boolean
        showShadow: boolean
        containerChangeable: boolean
        containerExtending: boolean
        zIndex: number
        selectZIndex: number
        getDiagram(): View | null
    }

    enum SizableNodeKind {
        none = 0,
        horizontal = 1,
        vertical = 2,
        ratio = 3,
        free = 4,
    }

    enum MovableNodeKind {
        none = 0,
        horizontal = 1,
        vertical = 2,
        free = 3
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#nodeview
     */
    class NodeView extends View {
        left: number
        top: number
        width: number
        height: number
        minWidth: number
        minHeight: number
        sizable: SizableNodeKind
        movable: MovableNodeKind
        autoResize: boolean
        // ??? many methods with no comments. are they private ?
    }


    /**
     * LM_
     */

    enum LineMode {
        solid = 0,
        dot = 1,
        dassh = 2
    }

    /**
     * LS_
     */

    enum LineStyle {
        rectilinear = 0,
        oblique = 1,
        roundRectangle = 2,
        curve = 3,
        direct = 4
    }

    /**
     * ES_
     */

    enum LineEndStyle {
        flat = 0,
        stickArrow = 1,
        solidArrow = 2,
        triangle = 3,
        filledTriangle = 4,
        diamond = 5,
        filledDiamond = 6,
        arrowDiamond = 7,
        arrowFilledDiamond = 8,
        plus = 9,
        circlePlus = 11,
        crowfootOne = 12,
        crowfootMany = 13,
        crowfootZeroOne = 14,
        crowfootZeroMany = 15
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#edgeview
     */
    class EdgeView extends View {
        BACKGROUND_COLOR: string // ??? why in uppercase
        head: View // [from card 1]
        tail: View // [from card 1]
        lineStyle: LineStyle
        lineMode: LineMode
        points: Points // ??? metamodel contains "points: Points {custum=true}
        headEndStyle: LineEndStyle
        tailEndStyle: LineEndStyle
    }

    type EdgeViewPredicate= (edge: EdgeView) => boolean

    /**
     * ??? not in doc api:
     */
    class FreeLineEdgeView extends EdgeView {
        // ??? There are three attributes in the metamodel but none in the code
        // ??? the attribute ar in EdgeView in the code
    }

    /**
     * LabelView.DK_
     */
    enum LabelDirection {
        horizontal = 0,
        vertical = 1
    }

    /**
     * graphics.js::Canvas.AL_
     */
    enum Alignment { // ??? enums coming from Canvas which is private ?
        left = 0,
        right = 1,
        center = 2,
        top = 3,
        bottom = 4,
        middle = 5
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#labelview
     */
    class LabelView extends NodeView {
        // ??? parentStyle:bookean not @member
        // ??? selectable not @member
        underline: boolean
        text: string
        horizontalAlignment: Alignment
        verticalAlignment: Alignment
        direction: LabelDirection
        wordWrap: boolean
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#parasiticview
     */
    class ParasiticView extends NodeView {
        alpha: number
        distance: number
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#nodeparasiticview
     */
    class NodeParasiticView extends ParasiticView {
        hostNode: NodeView | null  // [from card 0..1]
    }

    /**
     * EdgeParasiticView.EP_
     */
    enum EdgePosition {
        head = 0,
        middle = 1,
        tail = 2
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#edgeparasiticview
     */
    class EdgeParasiticView extends ParasiticView {
        hostEdge : EdgeView | null // [from card 0..1]
        edgePosition : EdgePosition
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#nodelabelview
     */
    class NodeLabelView extends NodeParasiticView {
        underline: boolean
        wordWrap: boolean // ??? not in metamodel
        enabled: boolean // ??? not in metamodel
        movable: MovableNodeKind // ??? not in metamodel
        sizable: SizableNodeKind // ??? not in metamodel
        text: string
        horizontalAlignment: Alignment
        verticalAlignment: Alignment
    }
    
    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#nodelabelview
     */
    class EdgeLabelView extends EdgeParasiticView {
        underline: boolean
        wordWrap: boolean // ??? not in metamodel but @member
        enabled: boolean // ??? not in metamodel nor @member
        movable: MovableNodeKind // ??? not in metamodel
        sizable: SizableNodeKind // ??? not in metamodel
        text: string
        horizontalAlignment: Alignment
        verticalAlignment: Alignment
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#nodenodeview
     */
    class NodeNodeView extends NodeParasiticView {
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#edgenodeview
     */
    class EdgeNodeView extends EdgeParasiticView {
    }

    /**
     * String enumeration Diagram.LD_. Not sure if it should be public and where it is used.
     */
    enum DiagramLayout {
        topToBottom = 'TB',
        bottomToTop = 'BT',
        leftToRight = 'LR',
        rightToLeft = "RL"
    }

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#diagram
     */
    class Diagram extends ExtensibleModel {
        visible: boolean
        defaultDiagram: boolean
        ownedViews: Array<View>
        selectedViews: Array<View>
        find(predicate: (x:any) => boolean): Diagram | View | null // ??? signature from code?, not public ?
        findDepthFirst(predicate: (x:any) => boolean): Diagram | View | null // ??? signature from code?, not public ?
        selectView(view: View): void
        deselectView(view: View): void
        // ??? not member addOwnedView(view: View): void
        // ??? not member removeOwnedView(view: View): void
        // ??? not member getOwnedViewById(id: string): View | null
        getViewOf(m: Model, viewType: Type): View // ??? return type from doc but is not clear
        selectAll(): void
        deselectAll(): void
        canContainKind(kind: TypeName): boolean
    }

    // ??? should LayoutDirection (Diagram.LD_ be public, string enum

    /**
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#diagram
     */
    class Project extends ExtensibleModel {
        name: string
        author: string
        company: string
        copyright: string
        version: string
    }

    type CoreModelType =
        Element | Model | Tag | Hyperlink | ExtensibleModel | Relationship | DirectedRelationship | RelationshipEnd | UndirectedRelationship | Project

    type CoreViewType =
        // Views
        View | NodeView | EdgeView | FreeLineEdgeView | Alignment | LabelView | ParasiticView | NodeParasiticView | EdgeParasiticView | NodeLabelView | EdgeLabelView  | NodeNodeView | EdgeNodeView | Diagram

    type CoreType = CoreModelType | CoreViewType
}