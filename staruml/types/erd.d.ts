declare namespace type {

    /**
     * code: extensions/erd/elements.js
     * doc api: no documentatioon
     * doc man: https://docs.staruml.io/working-with-additional-diagrams/entity-relationship-diagram
     */

    import Color = type.Color
    import Font = type.Font

    import View = type.View
    import Diagram = type.Diagram
    import NodeView = type.NodeView
    import EdgeView = type.EdgeView
    import EdgeParasiticView = type.EdgeParasiticView

    // ====================================================================
    //    Model elements
    // ====================================================================

    class ERDElement extends type.ExtensibleModel {
    }

    class ERDDataModel extends ERDElement {
    }

    class ERDDiagram extends type.Diagram {
    }

    class ERDColumn extends ERDElement {
        type: string
        length: string
        primaryKey: boolean
        foreignKey: boolean
        referenceTo: ERDColumn  // ??? in diagram represented as a attribute rather than reflexive association
        nullable: boolean
        unique: boolean
    }

    class ERDEntity extends ERDElement {
        columns: Array<ERDColumn>
        getRelationships(): Array<Element>
        getRelationshipEnds(counterpart: boolean): Array<ERDRelationshipEnd>
    }

    class ERDRelationshipEnd extends type.RelationshipEnd {
        cardinality: string
    }

    class ERDRelationship extends type.UndirectedRelationship {
        identifying: boolean
    }

    // ====================================================================
    //    View elements
    // ====================================================================

    class ERDColumnView extends type.LabelView {
        // Some attributes but not @member nor in metamodel
    }

    class ERDColumnCompartmentView extends type.NodeView {
        // Some attributes but not @member nor in metamodel
    }

    class ERDEntityView extends type.NodeView {
        suppressColumns: boolean  // ??? @member but not in metamodel
        nameLabel: LabelView // ??? @member but not in metamodel
        columnCompartment: ERDColumnCompartmentView // [from card 1]
    }

    class ERDRelationshipView extends type.EdgeView {
        nameLabel: EdgeLabelView // [from card 1]
        tailNameLabel: EdgeLabelView // [from card 1]
        headNameLabel: EdgeLabelView // [from card 1]
    }


    type ERDModelType =
        ERDElement | ERDDataModel | ERDColumn | ERDEntity | ERDRelationshipEnd | ERDRelationship

    type ERDViewType =
        ERDColumnView | ERDColumnCompartmentView | ERDEntityView | ERDRelationshipView

    type ERDType = ERDModelType | ERDViewType

}