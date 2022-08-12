declare namespace type {
        type MetaClassKind =
          "enum"
        | "class"

    interface AbstractMetaClass {
        name: string
    }

    interface EnumMetaClass extends AbstractMetaClass {
        kind: "enum"
        name: string
        literals: Array<string>
    }

    interface ClassMetaClass extends AbstractMetaClass {
        kind: "class"
        name: TypeName
        super?: string
        attributes: Array<MetaAttribute>
        view: string
    }

    type MetaClass = ClassMetaClass | EnumMetaClass

    type MetaAttributeKind =
          "prim"
        | "enum"
        | "ref"
        | "refs"
        | 'obj'
        | "objs"
        | "var"
        | "custom"

    type PrimaryType =
          "String"
        | "Boolean"
        | "Integer"
        | "Real"

    type MetaAttributeType =
          PrimaryType
        | TypeName

    interface MetaAttribute {
        name: string
        kind: MetaAttributeKind
        type: MetaAttributeType
        super?: string
        visible?: boolean
        default?: boolean | string | number
        transient?: boolean
    }
}