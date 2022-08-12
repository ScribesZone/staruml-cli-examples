declare namespace type {

    /**
     * code: extensions/uml/elements.js
     * doc api: no documentatioon
     * doc man: https://docs.staruml.io/working-with-additional-diagrams/entity-relationship-diagram
     */

    type UMLType =
        // models
          UMLBackboneType
        |  UMLConstraintsType
        |  UMLCommonBehaviorsType
        |  UMLClassesAndAssociationsType
        |  UMLInstancesType
        |  UMLCompositeStructuresType
        |  UMLComponentsType
        |  UMLDeploymentsType
        |  UMLUseCasesType
        |  UMLStateMachinesType_TODO  // TODO
        |  UMLActivitiesType_TODO  // TODO
        |  UMLInteractionsType_TODO
        |  UMLInformationsFlowsType_TODO
        |  UMLProfilesType
        //---- views
        | UMLCommonView
        | UMLClassAndAssocationDiagramView
        | UMLPackageDiagramView
        | UMLCompositeStructureDiagramView
        | UMLObjectDiagramView
        | UMLComponentDiagramView
        | UMLDeploymentDiagramView
        | UMLUseCaseDiagramView
        // TODO
        | ProfileDiagramView
        | AnnotationView

    //====================================================================
    //   Backbone
    //====================================================================

    type UMLBackboneType = UMLModelElement  |  UMLTemplateParameter  |  UMLFeature  |  UMLStructuralFeature  |  UMLParameter  |  UMLBehavioralFeature  |  UMLAttribute  |  UMLOperation  |  UMLReception  |  UMLClassifier  |  UMLDirectedRelationship  |  UMLRelationshipEnd  |  UMLUndirectedRelationship

    /**
     * enum UMLModelElement.VK_
     */
    enum UMLVisibilityKind {
        public = 'public',
        protected = 'protected',
        private = 'private',
        package = 'package'
    }

    class UMLModelElement extends ExtensibleModel  {

        // regular class
        stereotype: UMLStereotype  // ??? metamodel |  defined as attribute rather than assoc |  {variant=true} ?
        visibility: UMLVisibilityKind
        templateParameters: Array<UMLTemplateParameter>  // [from card 0..*]
        getDependencies(): Array<Element>
        getDependants(): Array<Element>
        getConstraints(): Array<UMLConstraint>

        //---- from UMLElementMixin mixin copied for simplicity
        getDisplayClassName(): string
        getVisibilityString(): string
        getString(): string
        getStereotypeString(): string
        getTagStringArray(): string
        getPropertyString(): string
    }

    class UMLTemplateParameter extends UMLModelElement {
        parameterType: UMLModelElement  // ??? string in @member |  UMLModelElement in metamodel with {variant=true}
        defaultValue: UMLModelElement // ??? string in @member |  UMLModelElement in metamodel with {variant=true}
    }

    enum UMLFeatureDirectionKind {
        provided = 'provided',
        required = 'required',
        providedRequired = 'providedRequired'
    }

    class UMLFeature extends UMLModelElement {
        isStatic: boolean
        isLeaf: boolean
        featureDirection: UMLFeatureDirectionKind
    }

    class UMLStructuralFeature extends UMLFeature {
        type: UMLClassifier // ??? any in @member |  UMLClassifier in metamodel with {variant=true}
        multiplicity: string
        isReadOnly: boolean
        isOrdered: boolean
        isUnique: boolean
        defaultValue: string
        getTypeString(): string
    }

    enum UMLDirectionKind {
        in = 'in',
        inout = 'inout',
        out = 'out',
        return = 'return'
    }

    class UMLParameter extends UMLStructuralFeature {
        direction: UMLDirectionKind
        getDirectionString (options: object)
    }

    enum UMLCallConcurrencyKind {
        sequential = 'sequential',
        guarded = 'guarded',
        concurrent = 'concurrent'
    }

    class UMLBehavioralFeature extends UMLFeature {
        parameters: Array<UMLParameter>  // [from card 0..*]
        raisedExceptions: Array<UMLSignal> // ??? @member: UMLSignal, metamodel: UMLClassifier
        concurrency: UMLCallConcurrencyKind
        getReturnParameter(): UMLParameter | null  // [from card 0..1]
        getNonReturnParameters(): Array<UMLParameter> // [from card 0..*]
        getParametersString(options: object): string
        getReturnString(options: object): string
    }

    enum UMLAggregationKind {
        none = 'none',
        shared = 'shared',
        composite = 'composite'
    }

    class UMLAttribute extends UMLStructuralFeature {
        isDerived: boolean
        aggregation: UMLAggregationKind
        idId: boolean
    }

    class UMLOperation extends UMLBehavioralFeature {
        isQuery: boolean
        isAbstract: boolean
        specification: string
        preconditions: Array<UMLConstraint>
        bodyConditions: Array<UMLConstraint>
        postconditions: Array<UMLConstraint>
    }

    class UMLReception extends UMLBehavioralFeature {
        signal: UMLSignal  |  null // [from card 0..1]
    }

    class UMLClassifier extends UMLModelElement {
        attributes: Array<UMLAttribute> // [from card 0..*]
        operations: Array<UMLOperation> // [from card 0..*]
        receptions: Array<UMLReception> // [from card 0..*]
        behaviors: Array<UMLBehavior> // ??? not shown in metamodel
        isAbstract: boolean
        isFinalSpecialization: boolean
        isLeaf: boolean

        getGeneralElements(includeInterfaces: boolean): Array<UMLModelElement> // [from card 0..*] ??? @return Array<Element>
        getSpecialElements(includeInterfaces: boolean): Array<UMLModelElement> // [from card 0..*] ??? @return Array<Element>
        getAncestors(includeInterfaces: boolean): Array<UMLModelElement> // [from card 0..*] ??? @return Array<Element>
        getDescendants(includeInterfaces: boolean): Array<UMLModelElement> // [from card 0..*] ??? @return Array<Element>
        isGeneralElement(elem: Element, includeInterfaces: boolean): boolean // ??? not in metamodel |  @members error in return type
        isSpecialElement(elem: Element,  includeInterfaces: boolean): boolean // ??? not in metamodel |  isSpecialElement
        isAncestor(elem: Element, includeInterfaces: boolean): boolean // ??? not in metamodel |  isSpecialElement
        isDescendant(elem: Element, includeInterfaces: boolean): boolean // ??? not in metamodel |  isSpecialElement
        getInterfaces(): Array<UMLInterface> // [from card 0..*]
        getComponents(): Array<UMLComponent> // [from card 0..*]
        getDeploymentTargets(): Array<UMLNode> // [from card 0..*]
        getAssociationEnds(opposite: boolean): Array<UMLAssociationEnd>
    }

    class UMLDirectedRelationship extends type.DirectedRelationship {
        stereotype: UMLStereotype
        visibility: UMLVisibilityKind

        //---- from UMLElementMixin mixin copied for simplicity
        getDisplayClassName(): string
        getVisibilityString(): string
        getString(): string
        getStereotypeString(): string
        getTagStringArray(): string
        getPropertyString(): string
    }

    class UMLRelationshipEnd extends type.RelationshipEnd {
        stereotype: UMLStereotype
        visibility: UMLVisibilityKind
        navigable: boolean
        aggregation: UMLAggregationKind
        multiplicity: string
        defaultValue: string
        isReadOnly: boolean
        isOrdered: boolean
        isUnique: boolean
        isDerived: boolean
        isId: false

         //---- from UMLElementMixin mixin copied for simplicity
        getDisplayClassName(): string
        getVisibilityString(): string
        getString(): string
        getStereotypeString(): string
        getTagStringArray(): string
        getPropertyString(): string
    }

    class UMLUndirectedRelationship extends type.UndirectedRelationship {
        stereotype: UMLStereotype
        visibility: UMLVisibilityKind

        //---- from UMLElementMixin mixin copied for simplicity
        getDisplayClassName(): string
        getVisibilityString(): string
        getString(): string
        getStereotypeString(): string
        getTagStringArray(): string
        getPropertyString(): string
    }


    //====================================================================
    //   Constraints
    //====================================================================

    type UMLConstraintsType = UMLConstraint  |  UMLIntervalConstraint  |  UMLTimeConstraint  |  UMLDurationConstraint

    class UMLConstraint extends UMLModelElement {
        specification: string
        constrainedElements: Array<UMLModelElement>
    }

    /**
     * ??? available from the GUI ? relly used ?
     */
    class UMLIntervalConstraint extends UMLConstraint {
        min: string
        max: string
    }
    /**
     * ??? available from the GUI ? relly used ?
     */
    class UMLTimeConstraint extends UMLIntervalConstraint {}
    /**
     * UMLDurationConstraint
     */
    class UMLDurationConstraint extends UMLIntervalConstraint {}


    //====================================================================
    //   Common behaviors
    //====================================================================

    type UMLCommonBehaviorsType = UMLBehavior  |  UMLOpaqueBehavior  |  UMLEvent

    class UMLBehavior extends UMLModelElement {
        isReentrant: boolean
        parameters: Array<UMLParameter> //  [from card 0..*] ??? string in @members (error)
        preconditions: Array<UMLConstraint>
        postconditions: Array<UMLConstraint>
    }

    class UMLOpaqueBehavior extends UMLBehavior {
    }

    enum UMLEventKind {
        signal = "signal",
        call = 'call',
        change = 'change',
        time = 'time',
        anyReceive = 'anyReceive'
    }

    class UMLEvent extends UMLModelElement {
        kind: UMLEventKind
        value: string
        expression: string
        targetOperation: UMLOperation  |  null // [from card 0..1]
        targetSignal: UMLSignal  |  null // [from card 0..1]
    }


    //====================================================================
    //   Classes and associations
    //====================================================================
    // Section renamed to avoid using UMLClassesTypes as an alias. This
    // name can be confused with UMLClassType ou UMLClass.

    type UMLClassesAndAssociationsType = UMLPackage  |  UMLModel  |  UMLClass  |  UMLInterface  |  UMLSignal  |  UMLDataType  |  UMLPrimitiveType  |  UMLEnumerationLiteral  |  UMLEnumeration  |  UMLDependency  |  UMLAbstraction  |  UMLRealization  |  UMLInterfaceRealization  |  UMLComponentRealization  |  UMLAssociationEnd  |  UMLAssociation  |  UMLAssociationClassLink  |  UMLTemplateBinding  |  UMLTemplateParameterSubstitution

    class UMLPackage extends UMLModelElement {
        importedElements: Array<UMLModelElement> // [from card 0..*]
    }

    class UMLModel extends UMLPackage {
        viewpoint: string
    }

    class UMLClass extends UMLClassifier {
        isActive: boolean
    }

    class UMLInterface extends UMLClassifier {
        getImplementingClassifiers(): Array<UMLClassifier>
    }

    class UMLSignal extends UMLClassifier {
    }

    class UMLDataType extends UMLClassifier {
    }


    class UMLPrimitiveType extends UMLDataType {
    }

    class UMLEnumerationLiteral extends UMLModelElement {
    }

    class UMLEnumeration extends UMLDataType {
        literals: UMLEnumerationLiteral // [from card 0..*]
    }

    class UMLDependency extends UMLDirectedRelationship {
        mapping: string
    }

    class UMLAbstraction extends UMLDependency {
    }

    class UMLRealization extends UMLAbstraction {
    }

    class UMLGeneralization extends UMLDirectedRelationship {
        discriminator: string
    }

    class UMLInterfaceRealization extends UMLRealization {
    }

    class UMLComponentRealization extends UMLRealization {
    }

    class UMLAssociationEnd extends UMLRelationshipEnd {
        qualifiers: Array<UMLAttribute> // [from card 0..*]
    }

    class UMLAssociation extends UMLUndirectedRelationship {
        end1: UMLAssociationEnd // [from card 1]
        end2: UMLAssociationEnd // [from card 1]
        isDerived: boolean
    }

    class UMLAssociationClassLink extends UMLModelElement {
        classSide: UMLClass // [from card 1]
        associationSide: UMLAssociation // [from card 1]
    }

    class UMLTemplateBinding extends UMLDirectedRelationship {
        parameterSubstitutions: Array<UMLTemplateParameterSubstitution> // [from card 0..*]
        // private |  not in metamodel getBindingInfo(): string
    }

    class UMLTemplateParameterSubstitution extends UMLModelElement {
        formal: UMLTemplateParameter // ??? not an assoc in metamodel ? [from card 1]
        actual: string  |  UMLModelElement // string  |  from @member
    }


    //====================================================================
    //   Instances
    //====================================================================

    type UMLInstancesType = UMLSlot  |  UMLInstance  |  UMLObject  |  UMLArtifactInstance  |  UMLComponentInstance  |  UMLLinkEnd  |  UMLLink

    class UMLSlot extends UMLModelElement {
        definingFeature: UMLStructuralFeature  |  null // [from card 0..1]
        type: string  |  UMLClassifier // ???  | ot in metamodel ?
        value: string
    }

    class UMLInstance extends UMLModelElement {
        classifier: UMLClassifier  |  null // [from card 0..1]
        slots : Array<UMLSlot> // [from card 0..*]
        value: string
    }

    class UMLObject extends UMLInstance {
    }

    class UMLArtifactInstance extends UMLInstance {
    }

    class UMLComponentInstance extends UMLInstance {
    }

    class UMLNodeInstance extends UMLInstance {
    }

    class UMLLinkEnd extends UMLRelationshipEnd {
    }

    class UMLLink extends UMLUndirectedRelationship {
        end1: UMLLinkEnd // [from card 1]
        end2: UMLLinkEnd // [from card 1]
        association: UMLAssociation  |  null // [from card 0..1]
    }


    //====================================================================
    //   Composite structures
    //====================================================================

    type UMLCompositeStructuresType = UMLPort  |  UMLConnectorEnd  |  UMLConnector  |  UMLCollaboration  |  UMLCollaborationUse  |  UMLRoleBinding

    class UMLPort extends UMLAttribute {
        isBehavior: boolean
        isService: boolean
        isConjugated: boolean
    }

    class UMLConnectorEnd extends UMLRelationshipEnd {}

    enum UMLConnectorKind {
        assembly = 'assembly',
        delegation = 'delegation'
    }

    class UMLConnector extends UMLUndirectedRelationship {
        end1: UMLConnectorEnd // [from card 1]
        end2: UMLConnectorEnd // [from card 1]
        type: UMLAssociation // ??? not (visible?) in etamodel |  0..1 ?
        kind: UMLConnectorKind
    }

    class UMLCollaboration extends UMLClassifier {}

    class UMLCollaborationUse extends UMLModelElement {
        type: UMLCollaboration // ??? not (visible?) in etamodel |  0..1 ?
    }

    class UMLRoleBinding extends UMLDependency {}


    //====================================================================
    //   Components
    //====================================================================

    type UMLComponentsType = UMLArtifact  |  UMLComponent  |  UMLSubsystem

    class UMLArtifact extends UMLClassifier {
        filename: string
    }

    class UMLComponent extends UMLClassifier {
        isIndirectlyInstantiated: boolean
    }

    class UMLSubsystem extends UMLComponent {}


    //====================================================================
    //   Deployments
    //====================================================================

    type UMLDeploymentsType = UMLNode  |  UMLDeployment  |  UMLCommunicationPath

    class UMLNode extends UMLClassifier {
        getDeployedElements: Array<Element>
    }

    class UMLDeployment extends UMLDependency {}

    class UMLCommunicationPath extends UMLAssociation {}


    //====================================================================
    //   Use cases
    //====================================================================

    type UMLUseCasesType = UMLExtensionPoint  |  UMLUseCase  |  UMLActor  |  UMLInclude  |  UMLExtend  |  UMLUseCaseSubject

    class UMLExtensionPoint extends UMLModelElement {
        location: string
    }

    class UMLUseCase extends UMLClassifier {
        extensionPoints: Array<UMLExtensionPoint>
        getActors(): Array<UMLActor>
        getIncludedUseCases(): Array<UMLUseCase>
        getExtendingUseCases(): Array<UMLUseCase>
        getAllIncludedUseCases(): Array<UMLUseCase>
    }

    class UMLActor extends UMLClassifier {
        getUseCases(): Array<UMLUseCase>
    }

    class UMLInclude extends UMLDirectedRelationship {
    }

    class UMLExtend extends UMLDirectedRelationship {
        condition: string
        extensionLocations: Array<UMLExtensionPoint>
    }

    class UMLUseCaseSubject extends UMLModelElement {
        represent: UMLClassifier // [from card 0..1]
    }


    //====================================================================
    // State machines  : TODO
    //====================================================================

    type UMLStateMachinesType_TODO = UMLStateMachine  |  UMLRegion  |  UMLVertex  |  UMLPseudostate  |  UMLConnectionPointReference  |  UMLState  |  UMLFinalState  |  UMLTransition

    type UMLStateMachine = object
    type UMLRegion = object
    type UMLVertex = object
    type UMLPseudostate = object
    type UMLConnectionPointReference = object
    type UMLState = object
    type UMLFinalState = object
    type UMLTransition = object

    //========================
    // ============================================
    // Activities  : TODO
    //====================================================================

    type UMLActivitiesType_TODO =  |  UMLActivity  |  UMLPin  |  UMLInputPin  |  UMLOutputPin  |  UMLExpansionNode  |  UMLActivityNode  |  UMLAction  |  UMLObjectNode  |  UMLObjectNode  |  UMLCentralBufferNode  |  UMLDataStoreNode  |  UMLControlNode  |  UMLInitialNode  |  UMLFinalNode  |  UMLFinalNode  |  UMLActivityFinalNode  |  UMLFlowFinalNode  |  UMLForkNode  |  UMLJoinNode  |  UMLMergeNode  |  UMLDecisionNode  |  UMLActivityGroup  |  UMLActivityPartition  |  UMLInterruptibleActivityRegion  |  UMLStructuredActivityNode  |  UMLExpansionRegion  |  UMLActivityEdge  |  UMLControlFlow  |  UMLObjectFlow  |  UMLActivityInterrupt  |  UMLActivityEdgeConnector

    type UMLActivity = object
    type UMLPin = object
    type UMLInputPin = object
    type UMLOutputPin = object
    type UMLExpansionNode = object
    type UMLActivityNode = object
    type UMLAction = object
    type UMLObjectNode = object
    type UMLCentralBufferNode = object
    type UMLDataStoreNode = object
    type UMLControlNode = object
    type UMLInitialNode = object
    type UMLFinalNode = object
    type UMLActivityFinalNode = object
    type UMLFlowFinalNode = object
    type UMLForkNode = object
    type UMLJoinNode = object
    type UMLMergeNode = object
    type UMLDecisionNode = object
    type UMLActivityGroup = object
    type UMLActivityPartition = object
    type UMLInterruptibleActivityRegion = object
    type UMLStructuredActivityNode = object
    type UMLExpansionRegion = object
    type UMLActivityEdge = object
    type UMLControlFlow = object
    type UMLObjectFlow = object
    type UMLActivityInterrupt = object
    type UMLActivityEdgeConnector = object


    //====================================================================
    // Interactions  : TODO
    //====================================================================

    type UMLInteractionsType_TODO = UMLInteractionFragment | UMLInteraction | UMLStateInvariant | UMLContinuation | UMLInteractionOperand | UMLCombinedFragment | UMLInteractionUse | UMLMessageEndpoint | UMLLifeline | UMLGate | UMLEndpoint | UMLMessage

    type UMLInteractionFragment = object
    type UMLInteraction = object
    type UMLStateInvariant = object
    type UMLContinuation = object
    type UMLInteractionOperand = object
    type UMLCombinedFragment = object
    type UMLInteractionUse = object
    type UMLMessageEndpoint = object
    type UMLLifeline = object
    type UMLGate = object
    type UMLEndpoint = object
    type UMLMessage = object


    //====================================================================
    //   InformationsFlows
    //====================================================================

    type UMLInformationsFlowsType_TODO = UMLInformationItem | UMLInformationFlow

    type UMLInformationItem = object
    type UMLInformationFlow = object


    //====================================================================
    //   Profiles
    //====================================================================

    type UMLProfilesType = UMLProfile  |  UMLImage  |  UMLClass  |  UMLMetaClass

    class UMLProfile extends UMLPackage {
    }

    class UMLImage extends UMLModelElement {
        width: number
        height: number
        content: string
        smallIcon: string
    }

    class UMLStereotype extends UMLClass {
        icon: UMLImage
    }

    class UMLMetaClass extends UMLModelElement {
    }

    class UMLExtension extends UMLDirectedRelationship {}



    //#####################################################################
    //   Common views
    //#####################################################################

    type UMLCommonView = UMLDiagram | UMLCompartmentView | UMLNameCompartmentView | UMLListCompartmentView | UMLAttributeView | UMLAttributeCompartmentView | UMLOperationView | UMLOperationView | UMLReceptionView | UMLReceptionCompartmentView | UMLTemplateParameterView | UMLTemplateParameterCompartmentView | UMLGeneralNodeView | UMLFloatingNodeView | UMLGeneralEdgeView | UMLClassifierView | UMLUndirectedRelationshipView

    class UMLDiagram extends Diagram {
        name: string
    }

    class UMLCompartmentView extends NodeView {
    }

    class UMLNameCompartmentView extends UMLCompartmentView {
        stereotypeLabel: LabelView
        nameLabel: LabelView
        namespaceLabel: LabelView
        propertyLabel: LabelView
    }

    class UMLListCompartmentView extends UMLCompartmentView {
    }

    class UMLAttributeView extends LabelView {
    }

    class UMLAttributeCompartmentView extends UMLListCompartmentView {
    }

    class UMLOperationView extends LabelView {
    }

    class UMLOperationCompartmentView extends UMLListCompartmentView {
    }

    class UMLReceptionView extends LabelView {
    }

    class UMLReceptionCompartmentView extends UMLListCompartmentView {
    }

    class UMLTemplateParameterView extends LabelView {
    }

    class UMLTemplateParameterCompartmentView extends UMLListCompartmentView {
    }

    enum StereotypeDisplay {
        none = 'none',
        label = 'label',
        decoration = 'decoration',
        decorationLabel = 'decoration-label',
        icon = 'icon',
        iconLabel = 'icon-label'
    }

    class UMLGeneralNodeView extends NodeView {
        stereotypeDisplay: StereotypeDisplay
        showVisibility: boolean
        showNamespace: boolean
        showProperty: boolean
        showType: boolean
        wordWrap: boolean
        nameCompartment: UMLNameCompartmentView
        getAllCompartments(): Array<UMLCompartmentView>
    }

    class UMLFloatingNodeView extends NodeView {
        nameLabel: NodeLabelView  // [from card 1]
        stereotypeLabel: NodeLabelView  // [from card 1]
        propertyLabel: NodeLabelView  // [from card 1]
        showProperty: boolean
    }

    class UMLGeneralEdgeView extends EdgeView {
        stereotypeDisplay: StereotypeDisplay
        showVisibility: boolean
        showProperty: boolean
        nameLabel: NodeLabelView  // [from card 1]
        stereotypeLabel: NodeLabelView  // [from card 1]
        propertyLabel: NodeLabelView  // [from card 1]

    }

    class UMLClassifierView extends UMLGeneralNodeView {
        suppressAttributes: boolean
        suppressOperations: boolean
        suppressReceptions: boolean
        showMultiplicity: boolean
        showOperationSignature: boolean
        attributeCompartment: UMLAttributeCompartmentView // [from card 1]
        operationCompartment: UMLOperationCompartmentView // [from card 1]
        receptionCompartment: UMLReceptionCompartmentView // [from card 1]
        templateParameterCompartment: UMLTemplateParameterCompartmentView // [from card 1]
    }

    class UMLUndirectedRelationshipView extends UMLGeneralEdgeView {
        showMultiplicity: boolean
        showType: boolean
        tailRoleNameLabel: EdgeLabelView
        tailPropertyLabel: EdgeLabelView
        tailMultiplicityLabel: EdgeLabelView
        headRoleNameLabel: EdgeLabelView
        headPropertyLabel: EdgeLabelView
        headMultiplicityLabel: EdgeLabelView
    }

    //====================================================================
    //   Class diagram views
    //====================================================================

    type UMLClassAndAssocationDiagramView = UMLClassDiagram | UMLClassView | UMLInterfaceView | UMLSignalView | UMLDataTypeView | UMLPrimitiveTypeView | UMLEnumerationLiteralView | UMLEnumerationLiteralCompartmentView | UMLEnumerationView | UMLGeneralizationView | UMLDependencyView | UMLRealizationView | UMLInterfaceRealizationView | UMLQualifierCompartmentView | UMLAssociationView | UMLAssociationClassLinkView | UMLTemplateBindingView

    class UMLClassDiagram extends UMLDiagram{
    }

    class UMLClassView extends UMLClassifierView {
    }

    class UMLInterfaceView extends UMLClassifierView {
    }

    class UMLSignalView extends UMLClassifierView {
    }

    class UMLDataTypeView extends UMLClassifierView {
    }

    class UMLPrimitiveTypeView extends UMLClassifierView {
    }

    class UMLEnumerationLiteralView extends LabelView {
    }

    class UMLEnumerationLiteralCompartmentView extends UMLListCompartmentView {
    }

    class UMLEnumerationView extends UMLClassifierView {
    }

    class UMLGeneralizationView extends UMLGeneralEdgeView {
    }

    class UMLDependencyView extends UMLGeneralEdgeView {
    }

    class UMLRealizationView extends UMLGeneralEdgeView {
    }

    class UMLInterfaceRealizationView extends UMLGeneralEdgeView {
    }

    class UMLQualifierCompartmentView extends UMLListCompartmentView {
    }

    class UMLAssociationView extends UMLUndirectedRelationshipView {
    }

    class UMLAssociationClassLinkView extends EdgeView {
    }

    class UMLTemplateBindingView extends UMLGeneralEdgeView {
    }


    //====================================================================
    //   Composite structure diagram views
    //====================================================================

    type UMLPackageDiagramView = UMLPackageDiagram | UMLPackageView | UMLModelView | UMLModelView | UMLSubsystemView | UMLContainmentView

    class UMLPackageDiagram extends UMLDiagram {
    }

    class UMLPackageView extends UMLGeneralNodeView {
    }

    class UMLModelView extends UMLPackageView {
    }

    class UMLSubsystemView extends UMLPackageView {
    }

    class UMLContainmentView extends EdgeView {  // ??? EdgeView instead od UMLEdgeView: may be a bug
    }


    //====================================================================
    //   Composite structure diagram views
    //====================================================================

    type UMLCompositeStructureDiagramView = UMLCompositeStructureDiagram | UMLPortView | UMLPartView | UMLConnectorView | UMLCollaborationView | UMLCollaborationUseView | UMLRoleBindingView
    
    class UMLCompositeStructureDiagram extends UMLDiagram {
    }
    
    class UMLPortView extends UMLFloatingNodeView {
    }
    
    class UMLPartView extends UMLGeneralNodeView {
    }
    
    class UMLConnectorView extends UMLUndirectedRelationshipView {
    }
    
    class UMLCollaborationView extends UMLGeneralNodeView {
    }
    
    class UMLCollaborationUseView extends UMLGeneralNodeView {
    }
    
    class UMLRoleBindingView extends UMLGeneralEdgeView {
    }


    //====================================================================
    //   Object diagram views
    //====================================================================

    type UMLObjectDiagramView = UMLObjectDiagram | UMLSlotView | UMLSlotCompartmentView | UMLObjectView | UMLLinkView

    class UMLObjectDiagram extends UMLDiagram {
    }

    class UMLSlotView extends LabelView {
    }

    class UMLSlotCompartmentView extends UMLListCompartmentView {
    }

    class UMLObjectView extends UMLGeneralNodeView {
    }

    class UMLLinkView extends UMLUndirectedRelationshipView {
    }


    //====================================================================
    //   Component diagram views
    //====================================================================

    type UMLComponentDiagramView = UMLComponentDiagram | UMLArtifactView | UMLArtifactInstanceView | UMLComponentView | UMLComponentInstanceView | UMLComponentRealizationView

    class UMLComponentDiagram extends UMLDiagram {
    }

    class UMLArtifactView extends UMLClassifierView {
    }

    class UMLArtifactInstanceView extends UMLGeneralNodeView {
    }

    class UMLComponentView extends UMLClassifierView {
    }

    class UMLComponentInstanceView extends UMLGeneralNodeView {
    }

    class UMLComponentRealizationView extends UMLGeneralEdgeView {
    }


    //====================================================================
    //   Deployment diagram views
    //====================================================================

    type UMLDeploymentDiagramView = UMLDeploymentDiagram | UMLNodeView | UMLNodeInstanceView | UMLNodeInstanceView | UMLDeploymentView | UMLCommunicationPathView

    class UMLDeploymentDiagram extends UMLDiagram {
    }

    class UMLNodeView extends UMLClassifierView {
    }

    class UMLNodeInstanceView extends UMLGeneralNodeView {
    }

    class UMLDeploymentView extends UMLGeneralEdgeView {
    }

    class UMLCommunicationPathView extends UMLAssociationView {
    }


    //====================================================================
    //   Use case diagram views
    //====================================================================

    type UMLUseCaseDiagramView = UMLUseCaseDiagram | UMLExtensionPointView | UMLExtensionPointCompartmentView | UMLUseCaseView | UMLActorView | UMLIncludeView | UMLExtendView | UMLUseCaseSubjectView

    class UMLUseCaseDiagram extends UMLDiagram {
    }

    class UMLExtensionPointView extends LabelView {
    }

    class UMLExtensionPointCompartmentView extends UMLListCompartmentView {
    }

    class UMLUseCaseView extends UMLClassifierView {
    }

    class UMLActorView extends UMLClassifierView {
    }

    class UMLIncludeView extends UMLGeneralEdgeView {
    }

    class UMLExtendView extends UMLGeneralEdgeView {
    }

    class UMLUseCaseSubjectView extends UMLGeneralNodeView {
    }

    //====================================================================
    //   State diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Activity diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Sequence diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Communication diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Timing diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Interaction overview diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Information flow diagram views : TODO
    //====================================================================

    // TODO


    //====================================================================
    //   Profile diagram views
    //====================================================================

    type ProfileDiagramView = UMLProfileDiagram | UMLProfileView | UMLMetaClassView | UMLMetaClassView | UMLExtensionView

    class UMLProfileDiagram extends UMLDiagram {
    }

    class UMLProfileView extends UMLPackageView {
    }

    class UMLMetaClassView extends UMLGeneralNodeView {
    }

    class UMLStereotypeView extends UMLClassView {
    }

    class UMLExtensionView extends UMLGeneralEdgeView {
    }


    //====================================================================
    //   Annotation views
    //====================================================================

    type AnnotationView = HyperlinkView | UMLCustomTextView | UMLTextView | UMLTextBoxView | UMLCustomNoteView | UMLNoteView | UMLConstraintView | UMLNoteLinkView | UMLConstraintLinkView | ShapeView | RectangleView | RoundRectView | EllipseView | ImageView

    class HyperlinkView extends NodeView {
        label: LabelView
        typeLabel: LabelView
    }

    class UMLCustomTextView extends NodeView {
        text: string
        wordWrap: boolean
        horzAlign: Alignment
        vertAlign: Alignment
    }

    class UMLTextView extends UMLCustomTextView {
    }

    class UMLTextBoxView extends UMLCustomTextView {
    }

    class UMLCustomNoteView extends UMLCustomTextView {
    }

    class UMLNoteView extends UMLCustomNoteView {
    }

    class UMLConstraintView extends UMLCustomNoteView {
    }

    class UMLNoteLinkView extends EdgeView {
    }

    class UMLConstraintLinkView extends EdgeView {
    }

    class ShapeView extends NodeView {
    }

    class RectangleView extends ShapeView {
    }

    class RoundRectView extends ShapeView {
    }

    class EllipseView extends ShapeView {
    }

    class ImageView extends NodeView {
    }



}
