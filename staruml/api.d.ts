declare namespace staruml_api {

    // from graphics
    import Point = type.Point
    import Points = type.Point
    import Rect = type.Rect
    import Font = type.Font

    // from core
    import Type = type.Type
    import Element = type.Element
    import ElementPredicate = type.ElementPredicate
    import Model = type.Model
    import Project = type.Project
    import View = type.View
    import EdgeViewPredicate = type.ElementPredicate
    import Diagram = type.Diagram
    import NodeView = type.NodeView
    import EdgeView = type.EdgeView
    import ParasiticView = type.ParasiticView

    /**
     * An alternative to declaring the app variable here "globally" (it's
     * ambient) is to add the following in the client code.
     *      import {AppContext} from "./staruml/api"
     *      const app: AppContext
     */

    //=====================================================================
    //   COMMANDS
    //
    // doc man: https://docs.staruml.io/developing-extensions/commands
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#commandmanager
    // ====================================================================


    type Command = Function

    /**
     * @private.code: src/engine/command-manager.js
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#commandmanager
     * Examples:
     *      * app.commands.register('helloworld:show-message', handleShowMessage)
     *      * app.commands.execute('helloworld:show-message')
     *      * app.commands.execute('helloworld:show-message', 'New Message')
     */

    class CommandManager {
        commands: Map<string, Command>
        commandNames: Map<string, string>

        /**
         * doc: https://docs.staruml.io/developing-extensions/commands#making-a-command
         */
        register(id: string, commandFn: Function, name?: string): void

        /**
         * doc: https://docs.staruml.io/developing-extensions/commands#passing-parameters
         */
        execute(commandName, ...args): any
    }


    //=====================================================================
    //   MENUS
    //
    // doc man: https://docs.staruml.io/developing-extensions/menus
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#menumanager
    // ====================================================================

    /**
     * code: src/ui/menu-manager.js
     * doc man: https://docs.staruml.io/developing-extensions/menus
     */
    class MenuManager {

        /**
         * doc aî: https://docs.staruml.io/developing-extensions/menus#changing-states-of-menu-items
         * @param visibleStates TODO
         * @param enabledStates TODO
         * @param checkedStates TODO
         */
        updateStates(visibleStates, enabledStates, checkedStates): void
    }


    /**
     * code: src/ui/context-menu-manager
     * doc-man:
     */

    class ContextMenuManager {
        // ??? should be private, question: popup(selector: string): void
    }


    //=====================================================================
    //   PROJECT
    //
    // doc man: https://docs.staruml.io/developing-extensions/accessing-elements#getting-a-top-level-project
    // doc api; https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#projectmanager
    // ====================================================================


    type StarUMLJSon = any

    class ProjectManager {
        getProject(): Project

        getFilename(): string

        newProject(): string

        closeProject(): void

        save(fullPath: string): Project

        load(fullPath: string): Project | null

        loadAsTemplate(fullPath: string): Project | null

        loadFromJson(json: StarUMLJSon): Project | null

        importFromFile(parent: Element, fullPath: string): Element | null

        importFromJson(parent: Element, data: StarUMLJSon): Element | null

        exportToFile(elem, fullPath): Element
    }

    //=====================================================================
    //   REPOSITORY
    //
    // doc man: https://docs.staruml.io/developing-extensions/accessing-elements
    // doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements
    // doc api; https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#projectmanager
    // ====================================================================
    
    type Operation = object // ???, cf OperationBuilder

    class Repository {
        doOperation(operation: Operation): void

        undo(): void

        redo(): void

        // clear()
        isModified(): boolean

        isElement(element: Element): boolean

        select(selector: string): Array<Element>

        get(id: string): Element | undefined

        getInstanceOf(_typeName: string | Array<string>): Array<Element>

        find(predicate: ElementPredicate): Element | null

        findAll(predicate: ElementPredicate): Element | Array<Element>

        search(keyword: string, typeFilter?: Type): Element | Array<Element>

        lookupAndFind(namespace: Element, name: string, typeFilter: Type): Element | null

        getRefsTo(elem: Element, iterator?: ElementPredicate): Array<Element>

        getRelationshipsOf(model: Model, iterator?: ElementPredicate): Array<Element>

        getViewsOf(model: Model): Array<View>

        getEdgeViewsOf(view: View): Array<EdgeView>   // private. Why ?
        getConnectedNodeViews(view: View, edgeType: Type, predicate: EdgeViewPredicate): Array<NodeView>  // private. Why ?
        getConnectedHeadNodeViews(view: View, edgeType: Type): Array<NodeView> // private. Why ?
        getConnectedTailNodeViews(view: View, edgeType: Type): Array<NodeView> // private. Why ?
        getOperationBuilder(): OperationBuilder
    }

    /**
     * OperationBuilder is used to build an operation.
     * code: src/core/repository.js
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#operationbuilder
     */
    class OperationBuilder {
        getTimestamp(): number

        begin(name: string, bypass?: boolean): void

        end(): void

        discard(): void

        getOperation(): Operation

        insert(elem: Element): void

        remove(elem: Element): void

        fieldAssign(elem: Element, field: string, val: any): void

        fieldInsert(elem: Element, field: string, val: any): void

        fieldInsertAt(elem: Element, field: string, val: any, pos: number): void

        fieldRemove(elem: Element, field: string, val: any): void

        fieldRemoveAt(elem: Element, field: string, val: any, pos: number): void

        fieldReorder(elem: Element, field: string, val: any, pos: number): void

        fieldRelocate(elem: Element, field: string, oldParent: number, newParent: number): void
    }


    //=====================================================================
    //   ENGINE
    //
    // code: src/engine/engine.js
    // doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#modifying-elements
    // doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#deleting-elements
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#engine
    // ====================================================================

    type Editor = object //  ??? No editor class in the source, used in moveViews

    interface Separations {   // ??? infered from code
        node?: number,  // type ok ?
        edge?: number,  // type ok ?
        rank?: number   // type ok ?
    }

    class Engine {
        addModel(parent: Model, field: string, model: Model): Model | null

        addViews(diagram: Diagram, views: Array<View>): null | void  // NOTE: source views: Array<Core.View>
        addModelAndView(diagram: Diagram, model: Model, view: View, parent: Model, parentField?: string, containerView?: View)

        setProperty(elem: Element, field: string, value: any): null | void

        setProperties(elem: Element, fieldValueMap: { string: any }): void

        setElemsProperty(elems: Array<View>, field: string, value: any): null | void

        deleteElements(models: Array<Model>, views: Array<View>): null | void

        addItem(elem: Element, field: string, val: Element): null | void

        removeItem(elem: Element, field: string, val: Element): null | void

        moveUp(parent: Element, field: string, elem: Element): null | void

        moveDown(parent: Element, field: string, elem: Element): null | void

        relocate(elem: Element, newOwner: Element, field: string): null | void

        moveViews(editor: Editor, views: Array<View>, dx: number, dy: number): null | void

        moveParasiticView(editor: Editor, view: ParasiticView, alpha: number, distance: number): null | void

        resizeNode(editor: Editor, node: NodeView, left: number, top: number, right: number, bottom: number): null | void

        modifyEdge(editor: Editor, edge: EdgeView, points: Points): null | void

        reconnectEdge(editor: Editor, edge: EdgeView, points: Points, newParticipant: NodeView, newParticipantModel: unknown, isTailSide: boolean): null | void  // ??? the newParticipantModel parameter is not in the documentation
        moveViewsChangingContainer(editor: Editor, views: Array<View>, dx: number, dy: number, containerView: View)

        setFillColor(editor: Editor, views: Array<View>, color: string): null | void

        setLineColor(editor: Editor, views: Array<View>, color: string): null | void

        setFont(editor: Editor, views: Array<View>, face: string, size: number, color: string): null | void

        setFontColor(editor: Editor, views: Array<View>, color: string): null | void

        setFontFace(editor: Editor, views: Array<View>, fontFace: string): null | void

        setFontSize(editor: Editor, views: Array<View>, fontSize: number): null | void

        setStereotypeDisplay(editor: Editor, views: Array<View>, stereotypeDisplay: string): null | void

        setLineStyle(editor: Editor, views: Array<View>, lineStyle: string): null | void

        setAutoResize(editor: Editor, views: Array<View>, autoResize: boolean): null | void

        layoutDiagram(editor: Editor, diagram: Diagram, direction: string, separations: Separations, edgeLineStyle: number)
    }


    //=====================================================================
    //   FACTORY
    //
    // code: src/engine/factory.js
    // doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-elements
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#factory
    // ====================================================================

    /**
     *Model id. Used by factory.createModel()
     * This list is extracted from StarUML with the following function :
     *
     *     app.factory.getModelIds().map(s=>'"'+s+'"').join(' | ')
     *
     * The value below has been extracted from StarUML 5.0.1. New versions
     * might add types. In this case the function must be reexcuted.
     */
    type ModelId =
        "UMLModel"
        | "UMLPackage"
        | "UMLSubsystem"
        | "UMLProfile"
        | "UMLClass"
        | "UMLInterface"
        | "UMLSignal"
        | "UMLDataType"
        | "UMLPrimitiveType"
        | "UMLEnumeration"
        | "UMLArtifact"
        | "UMLComponent"
        | "UMLNode"
        | "UMLUseCase"
        | "UMLActor"
        | "UMLStereotype"
        | "UMLInformationItem"
        | "UMLObject"
        | "UMLArtifactInstance"
        | "UMLComponentInstance"
        | "UMLNodeInstance"
        | "UMLCollaboration"
        | "UMLInteraction"
        | "UMLStateMachine"
        | "UMLActivity"
        | "UMLOpaqueBehavior"
        | "UMLInteractionOperand"
        | "UMLTemplateParameter"
        | "UMLTemplateParameterSubstitution"
        | "UMLParameter"
        | "UMLEnumerationLiteral"
        | "UMLAttribute"
        | "UMLPort"
        | "UMLOperation"
        | "UMLReception"
        | "UMLExtensionPoint"
        | "UMLSlot"
        | "UMLState"
        | "UMLRegion"
        | "UMLAction"
        | "UMLEvent"
        | "UMLConstraint"
        | "SysMLRequirement"
        | "SysMLBlock"
        | "SysMLValueType"
        | "SysMLInterfaceBlock"
        | "SysMLConstraintBlock"
        | "SysMLProperty"
        | "SysMLOperation"
        | "SysMLFlowProperty"
        | "SysMLPort"
        | "SysMLItemFlow"
        | "ERDDataModel"
        | "ERDEntity"
        | "ERDColumn"
        | "DFDDataFlowModel"
        | "DFDExternalEntity"
        | "DFDProcess"
        | "DFDDataStore"
        | "Tag"

    /**
     * Diagram id. Used by the factory.createDiagram()
     * This list is extracted from StarUML with the following function :
     *
     *     app.factory.getDiagramIds().map(s=>'"'+s+'"').join(' | ')
     *
     * The value below has been extracted from StarUML 5.0.1. New versions
     * might add types. In this case the function must be reexcuted.
     */
    type DiagramId =
        "UMLClassDiagram"
        | "UMLCompositeStructureDiagram"
        | "UMLPackageDiagram"
        | "UMLObjectDiagram"
        | "UMLComponentDiagram"
        | "UMLDeploymentDiagram"
        | "UMLProfileDiagram"
        | "UMLUseCaseDiagram"
        | "UMLSequenceDiagram"
        | "UMLCommunicationDiagram"
        | "UMLTimingDiagram"
        | "UMLInteractionOverviewDiagram"
        | "UMLInformationFlowDiagram"
        | "UMLStatechartDiagram"
        | "UMLActivityDiagram"
        | "SysMLRequirementDiagram"
        | "SysMLBlockDefinitionDiagram"
        | "SysMLInternalBlockDiagram"
        | "SysMLParametricDiagram"
        | "ERDDiagram"
        | "FCFlowchartDiagram"
        | "DFDDiagram"

    /**
     * Diagram and view id. Used by the factory.createModelAndView()
     * This list is extracted from StarUML with the following function :
     *
     *     app.factory.getModelAndViewIds().map(s=>'"'+s+'"').join(' | ')
     *
     * The value below has been extracted from StarUML 5.0.1. New versions
     * might add types. In this case the function must be reexcuted.
     */

    type ModelAndViewId =
        "UMLClass"
        | "UMLInterface"
        | "UMLSignal"
        | "UMLDataType"
        | "UMLPrimitiveType"
        | "UMLEnumeration"
        | "UMLAssociation"
        | "UMLAssociationClass"
        | "UMLNaryAssociationNode"
        | "UMLDependency"
        | "UMLGeneralization"
        | "UMLInterfaceRealization"
        | "UMLTemplateBinding"
        | "UMLModel"
        | "UMLPackage"
        | "UMLSubsystem"
        | "UMLContainment"
        | "UMLPort"
        | "UMLPart"
        | "UMLCollaboration"
        | "UMLCollaborationUse"
        | "UMLConnector"
        | "UMLRoleBinding"
        | "UMLRealization"
        | "UMLArtifact"
        | "UMLComponent"
        | "UMLComponentRealization"
        | "UMLNode"
        | "UMLDeployment"
        | "UMLCommunicationPath"
        | "UMLObject"
        | "UMLArtifactInstance"
        | "UMLComponentInstance"
        | "UMLNodeInstance"
        | "UMLLink"
        | "UMLLinkObject"
        | "UMLUseCaseSubject"
        | "UMLUseCase"
        | "UMLActor"
        | "UMLInclude"
        | "UMLExtend"
        | "UMLLifeline"
        | "UMLEndpoint"
        | "UMLGate"
        | "UMLMessage"
        | "UMLFoundMessage"
        | "UMLLostMessage"
        | "UMLStateInvariant"
        | "UMLTimingState"
        | "UMLTimeSegment"
        | "UMLTimeTick"
        | "UMLContinuation"
        | "UMLCombinedFragment"
        | "UMLInteractionUse"
        | "UMLTimeConstraint"
        | "UMLDurationConstraint"
        | "UMLInteractionUseInOverview"
        | "UMLInteractionInOverview"
        | "UMLFrame"
        | "UMLState"
        | "UMLSubmachineState"
        | "UMLPseudostate"
        | "UMLFinalState"
        | "UMLConnectionPointReference"
        | "UMLTransition"
        | "UMLAction"
        | "UMLObjectNode"
        | "UMLCentralBufferNode"
        | "UMLDataStoreNode"
        | "UMLInitialNode"
        | "UMLActivityFinalNode"
        | "UMLFlowFinalNode"
        | "UMLForkNode"
        | "UMLJoinNode"
        | "UMLMergeNode"
        | "UMLDecisionNode"
        | "UMLInputPin"
        | "UMLOutputPin"
        | "UMLActivityPartition"
        | "UMLInterruptibleActivityRegion"
        | "UMLStructuredActivityNode"
        | "UMLExpansionRegion"
        | "UMLInputExpansionNode"
        | "UMLOutputExpansionNode"
        | "UMLControlFlow"
        | "UMLObjectFlow"
        | "UMLExceptionHandler"
        | "UMLActivityInterrupt"
        | "UMLActivityEdgeConnector"
        | "UMLInformationItem"
        | "UMLInformationFlow"
        | "UMLProfile"
        | "UMLStereotype"
        | "UMLMetaClass"
        | "UMLExtension"
        | "SysMLStakeholder"
        | "SysMLView"
        | "SysMLViewpoint"
        | "SysMLConform"
        | "SysMLExpose"
        | "SysMLRequirement"
        | "SysMLCopy"
        | "SysMLDeriveReqt"
        | "SysMLVerify"
        | "SysMLSatisfy"
        | "SysMLRefine"
        | "SysMLBlock"
        | "SysMLValueType"
        | "SysMLInterfaceBlock"
        | "SysMLConstraintBlock"
        | "SysMLPart"
        | "SysMLReference"
        | "SysMLValue"
        | "SysMLPort"
        | "SysMLConnector"
        | "SysMLConstraintProperty"
        | "SysMLConstraintParameter"
        | "ERDEntity"
        | "ERDRelationship"
        | "FCFlow"
        | "FCProcess"
        | "FCTerminator"
        | "FCDecision"
        | "FCDelay"
        | "FCPredefinedProcess"
        | "FCAlternateProcess"
        | "FCData"
        | "FCDocument"
        | "FCMultiDocument"
        | "FCPreparation"
        | "FCDisplay"
        | "FCManualInput"
        | "FCManualOperation"
        | "FCCard"
        | "FCPunchedTape"
        | "FCConnector"
        | "FCOffPageConnector"
        | "FCOr"
        | "FCSummingJunction"
        | "FCCollate"
        | "FCSort"
        | "FCMerge"
        | "FCExtract"
        | "FCStoredData"
        | "FCDatabase"
        | "FCDirectAccessStorage"
        | "FCInternalStorage"
        | "DFDExternalEntity"
        | "DFDProcess"
        | "DFDDataStore"
        | "DFDDataFlow"
        | "Text"
        | "TextBox"
        | "FreeLine"
        | "Note"
        | "NoteLink"
        | "Hyperlink"
        | "Rect"
        | "RoundRect"
        | "Ellipse"
        | "Image"


    /**
     * doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-diagram
     */
    interface CreateDiagramOptions {  // ???inferred from doc,
        id: DiagramId,
        parent: Model,
        diagramType?: string,  // from code
        diagramInitializer?: (diagram: Diagram) => void
    }

    /**
     * doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-model-element
     */
    interface CreateModelOptions {
        id: ModelId
        parent: Model
        field?: string
        modelInitializer?: (element: Element) => void
    }

    /**    class Point {
        x: number,
        y: number
    }

     in
     * doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-model-element-and-a-view-element-at-once
     *
     * This is another way to use options (TODO: should be added in the interface below)
     *
     *     doc man: https://docs.staruml.io/developing-extensions/toolbox#command
     */
    interface CreateModelAndViewOptions {
        id: ModelAndViewId
        parent: Model
        diagram: Diagram
        modelInitializer?: (element: Element) => void
        diagramInitializer?: (diagram: Diagram) => void
        x1?: number
        y1?: number
        x2?: number
        y2?: number
        tailView?: View
        headView?: View
        tailModel?: Model
        headModel?: Model
        containerView?: View
    }


    /**
     * doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-view-element-of-an-existing-model-element
     */

    interface CreateViewOfOptions {
        model: Model
        diagram: Diagram
        viewInitializer?: (view: View) => void
        x?: number
        y?: number
        containerView?: View
    }

    class Factory {
        // // private,  but useful ?
        // diagramFn : { string: Function }  // private
        // // private modelFn : { string: Function }  // private
        // modelAndViewFn : { string: Function }  // private
        // modelAndViewOptions : { string: Object }  // private
        // viewOfFn : { string: Function }  // private


        /**
         * private but referenced in the doc: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-model-element
         */
        getModelIds(): Array<ModelId>

        createModel(options: CreateModelOptions): Model // ??? options are not really  documented

        /**
         * private but referenced in the doc: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-model-element
         */
        getDiagramIds(): Array<DiagramId>

        createDiagram(options: CreateDiagramOptions): Diagram // ??? options are not really  documented

        /**
         * private but referenced in the doc: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-model-element-and-a-view-element-at-once
         * see also doc man: https://docs.staruml.io/developing-extensions/toolbox#command
         * This list has been used to create theModelId type.
         */

        getModelAndViewIds(): Array<ModelAndViewId>

        createModelAndView(options: CreateModelAndViewOptions): void

        /**
         * doc man: https://docs.staruml.io/developing-extensions/creating-deleting-and-modifying-elements#creating-a-view-element-of-an-existing-model-element
         * @param options
         */
        createViewOf(options: CreateViewOfOptions): unknown | null

        createViewAndRelationships(editor: Editor, x: number, y: number, model: Model, containerView: View, viewType?: Type): View
    }


    //=====================================================================
    //   DIAGRAM
    //
    // code: src/ui/diagram-manager.js
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#diagrammanager
    // ====================================================================


    class DiagramManager {
        openDiagram(diagram: Diagram): void

        updateDiagram(diagram: Diagram): void

        closeDiagram(diagram: Diagram): void

        getWorkingDiagrams(): Array<Diagram>

        saveWorkingDiagrams(): void

        restoreWorkingDiagrams(): void

        closeOthers(): void

        closeAll(): void

        setCurrentDiagram(diagram: Diagram, skipEvent: boolean): void

        getCurrentDiagram(): Diagram

        nextDiagram(): void

        previousDiagram(): void

        selectAll(): void

        deselectAll(): void

        selectInDiagram(view: View): void

        // ???: question should be private repaint
        setZoomLevel(value: number): void

        getZoomLevel(): number

        toggleGrid(): void

        showGrid(): void

        hideGrid(): void

        isGridVisible(): void

        getViewportSize(): Point

        scrollTo(x: number, y: number, animation: boolean)

        getScrollPosition(): Point

        getDiagramArea(): Rect
    }


    //=====================================================================
    //   SELECTION
    //
    // code: src/engine/selection-manager.js
    // doc man: https://docs.staruml.io/developing-extensions/working-with-selection
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#selectionmanager
    // ====================================================================

    class SelectionManager {
        // private: selectedModels: Array<Model>
        // private: selectedViews: Array<View>
        getSelectedModels(): Array<Model>

        getSelectedViews(): Array<View>

        deselectAll(): void

        select(models: Array<Model>, views: Array<View>): void

        selectModel(model: Model): void

        selectViews(views: Array<View>): void

        getSelected(): Model | undefined
    }


    //=====================================================================
    //   PREFERENCES
    //
    // code: src/core/preference-manager.js
    // doc man: https://docs.staruml.io/developing-extensions/defining-preferences
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#preferencemanager
    // ====================================================================

    class PreferenceManager {
        get(key: string, defaultValue?: any): any

        set(key: string, value: any): void
    }


    //=====================================================================
    //   MODEL EXPLORER
    //
    // code: src/views/model-explorer-views.js
    // doc api:
    //=====================================================================

    class ModelExplorerView {
        expand(elem: Model, expandAllParents: boolean): void

        collapse(elem: Model, scrollTo: boolean): void

        select(elem: Model, scrollTo: boolean): void

        deselect(): void
    }


    //=====================================================================
    //   DIALOGS
    //
    // code: src/dialogs/dialog-manager.js
    // doc man: https://docs.staruml.io/developing-extensions/using-dialogs
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#dialogmanager
    // ====================================================================

    /**
     * Dialog is not defined as a class  : see line src/dialogs/dialog-manager.js:171
     */
    type Dialog = any

    interface SelectDialogItem {
        text: string,
        value: string
    }

    interface FileDialogFilter {
        name: string
        extensions: Array<string>
    }

    type DialogButton = 'ok' | 'cancel' | 'save' | 'dontsave' | '_canceled'

    class DialogManager {
        showInputDialog(message: string, initialValue: string): Dialog

        showTextDialog(message: string, text: string): Dialog

        showSelectRadioDialog(message: string, items: Array<SelectDialogItem>): Dialog

        showSelectDropdownDialog(message: string, items: Array<SelectDialogItem>): Dialog

        showColorDialog(color: string): Dialog

        showFontDialog(font: Font): Dialog

        showSimpleDialog(message: string): string

        showConfirmDialog(message: string): string

        showAlertDialog(message: string): string

        showInfoDialog(message: string): string

        showOpenDialog(title: string, defaultPath: string, filters: Array<FileDialogFilter>, options: object): Array<string> | null

        showSaveDialog(title: string, defaultPath: string, filters: Array<FileDialogFilter>): string | null

        showSaveConfirmDialog(filename: string): DialogButton

        showErrorDialog(message: string): void

    }


    /**
     * source: src/dialogs/element-list-picker.json
     * doc man: https://docs.staruml.io/developing-extensions/using-dialogs#element-dialogs
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#elementpickerdialog
     */

    class ElementPickerDialog {
        showDialog(title: string, selected?: Element, type?: Type): Dialog

        expand(model: Model, expandAllParents?: boolean): void // should be private ?
        select(model: Model, scrollTo?: boolean): void // should be private ?
    }


    /**
     * doc man: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#elementlistpickerdialog
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#elementlistpickerdialog
     */

    class ElementListPickerDialog {
        showDialog(title: string, elems: Array<Model>)
    }


    /**
     * Not in manual documentation.
     * code: src/dialogs/element-list-editor-dialog.js
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#elementlisteditordialog
     */

    class ElementListEditorDialog {
        showDialog(elem: Model, field: string): Dialog
    }


    /**
     * code: src/ui/toast-manager.js
     * doc man: https://docs.staruml.io/developing-extensions/using-dialogs#toast
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#toastmanager
     */

    class ToastManager {
        info(message: string): void

        warning(message: string): void

        error(message: string): void
    }


    //=====================================================================
    //   PANELS
    //
    // code: src/ui/panel-manager.js
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#panel
    // doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#panelmanager
    // ====================================================================

    /**
     * doc
     * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#panel
     */
    class Panel {
        isVisible(): boolean

        setVisible(visible: boolean): void
    }

    type jQueryObject = JQuery  // ??? Not sure if this is OK

    class PanelManager {
        createBottomPanel(id: string, $panel: jQueryObject, minSize: number): Panel
    }


    //=====================================================================
    //   METAMODELS
    //
    // Not shown in the doc api.
    //=====================================================================

    interface MetaAttribute {
        name: string
        kind: string
        type: string
    }

    /**
     * code:
     */
    class MetamodelManager {
        getMetaAttributes(typeName: string): Array<MetaAttribute>

        isKindOf(child: string, parent: string): boolean

        getViewTypeOf(typeName: string): string | null

        getAvailableViewTypes(diagramTypeName: string): Array<string>
    }


    class AppContext {
        /**
         * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#appcontextname
         */
        readonly name: string

        /**
         * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#appcontextversion
         */
        readonly version: string

        // `app.type` is also available as `type`

        readonly metadata: unknown  // TODO

        readonly project: ProjectManager

        /**
         * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#appcontextgetapppath
         */
        getAppPath(): string

        /**
         * doc api: https://s3.amazonaws.com/staruml-bucket/docs/3.0.0/api/index.html#appcontextgetuserpath
         */
        getUserPath(): string

        readonly commands: CommandManager

        readonly menu: MenuManager

        readonly contextMenu: ContextMenuManager

        readonly repository: Repository

        readonly engine: Engine

        readonly factory: Factory

        readonly diagrams: DiagramManager

        readonly selections: SelectionManager

        readonly preferences: PreferenceManager

        readonly modelExplorer: ModelExplorerView

        readonly dialog: DialogManager

        readonly elementPickerDialog: ElementPickerDialog

        readonly elementListPickerDialog: ElementListPickerDialog

        readonly elementListEditorDialog: ElementListEditorDialog

        readonly toast: ToastManager

        readonly panelManager: PanelManager

        readonly metamodels: MetamodelManager

    }
}

declare var app : staruml_api.AppContext

