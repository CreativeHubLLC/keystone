---
title: "GraphQL Query Filters"
description: "A reference list of every filters available for every Keystone field type. Keystone filters are typically named after the field they are filtering."
---

{% hint kind="warn" %}
We recently improved this API so it’s easier to program and reason about. If you were using it prior to August 17th 2021, [read this guide](/updates/new-graphql-api) for info on how to upgrade.
{% /hint %}

Each field type provides its own set of filters which can be used with [queries](./overview#users).
This page lists all the filters available for each field type.
For more details on how to use filters in queries please consult to the [GraphQL Queries - Filters](../guides/filters) guide.

## Scalar types

### checkbox

| **Filter name** | **Type**                | **Description**                 |
| --------------- | ----------------------- | ------------------------------- |
| `equals`        | `Boolean`               | Equals                          |
| `not`           | `BooleanNullableFilter` | Does not match the inner filter |

### integer

| **Filter name** | **Type**            | **Description**                 |
| --------------- | ------------------- | ------------------------------- |
| `equals`        | `Int`               | Equals                          |
| `lt`            | `Int`               | Less than                       |
| `lte`           | `Int`               | Less than or equal              |
| `gt`            | `Int`               | Greater than                    |
| `gte`           | `Int`               | Greater than or equal           |
| `in`            | `[Int!]`            | Is in the array                 |
| `notIn`         | `[Int!]`            | Is not in the array             |
| `not`           | `IntNullableFilter` | Does not match the inner filter |

### bigInt

| **Filter name** | **Type**               | **Description**                 |
| --------------- | ---------------------- | ------------------------------- |
| `equals`        | `BigInt`               | Equals                          |
| `lt`            | `BigInt`               | Less than                       |
| `lte`           | `BigInt`               | Less than or equal              |
| `gt`            | `BigInt`               | Greater than                    |
| `gte`           | `BigInt`               | Greater than or equal           |
| `in`            | `[BigInt!]`            | Is in the array                 |
| `notIn`         | `[BigInt!]`            | Is not in the array             |
| `not`           | `BigIntNullableFilter` | Does not match the inner filter |

### json

The `json` field type does not support filters.

### float

| **Filter name** | **Type**              | **Description**                 |
| --------------- | --------------------- | ------------------------------- |
| `equals`        | `Float`               | Equals                          |
| `lt`            | `Float`               | Less than                       |
| `lte`           | `Float`               | Less than or equal              |
| `gt`            | `Float`               | Greater than                    |
| `gte`           | `Float`               | Greater than or equal           |
| `in`            | `[Float!]`            | Is in the array                 |
| `notIn`         | `[Float!]`            | Is not in the array             |
| `not`           | `FloatNullableFilter` | Does not match the inner filter |

### password

| **Filter name** | **Type**  | **Description** |
| --------------- | --------- | --------------- |
| `isSet`         | `Boolean` | A value is set  |

### select

- If the `type` is `string`(the default), the same filters as `text` will be available.
- If the `type` is `integer`, the same filters as `integer` will be available.
- If the `type` is `enum`, the following filters will be available:
  \| **Filter name** \| **Type** \| **Description** \|
  \| --------------- \| ---------- \| ------------------- \|
  \| `equals` \| `ListKeyFieldKeyType` | Equals |
  \| `in` \| `[ListKeyFieldKeyType!]` | Is in the array |
  \| `notIn` \| `[ListKeyFieldKeyType!]` | Is not in the array |
  \| `not` \| `ListKeyFieldKeyTypeNullableFilter` | Does not match the inner filter |

### text

| **Filter name** | **Type**                                 | **Description**                                       | **Notes** |
| --------------- | ---------------------------------------- | ----------------------------------------------------- | --------- |
| `equals`        | `String`                                 | Equals                                                |           |
| `lt`            | `String`                                 | Less than                                             |           |
| `lte`           | `String`                                 | Less than or equal                                    |           |
| `gt`            | `String`                                 | Greater than                                          |           |
| `gte`           | `String`                                 | Greater than or equal                                 |           |
| `contains`      | `String`                                 | Contains                                              | [1]       |
| `startsWith`    | `String`                                 | Starts with                                           | [1]       |
| `endsWith`      | `String`                                 | Ends with                                             | [1]       |
| `in`            | `[String!]`                              | Is in the array                                       |           |
| `notIn`         | `[String!]`                              | Is not in the array                                   |           |
| `mode`          | `QueryMode` (`default` or `insensitive`) | Whether the filters should be case insensitive or not | [2]       |
| `not`           | `NestedStringNullableFilter`             | Does not match the inner filter                       |           |

#### Notes

- [1] Will follow the setting of the `mode` on `postgresql` and will be case insensitive but only for ASCII characters on `sqlite`
- [2] `postgresql` only

### timestamp

| **Filter name** | **Type**                 | **Description**                 |
| --------------- | ------------------------ | ------------------------------- |
| `equals`        | `String`                 | Equals                          |
| `lt`            | `String`                 | Less than                       |
| `lte`           | `String`                 | Less than or equal              |
| `gt`            | `String`                 | Greater than                    |
| `gte`           | `String`                 | Greater than or equal           |
| `in`            | `[String!]`              | Is in the array                 |
| `notIn`         | `[String!]`              | Is not in the array             |
| `not`           | `DateTimeNullableFilter` | Does not match the inner filter |

## Relationship type

### relationship

#### many: true

| **Filter name** | **Type**        | **Description**                            |
| --------------- | --------------- | ------------------------------------------ |
| `every`         | `FooWhereInput` | All related items match the nested filter  |
| `some`          | `FooWhereInput` | Some related items match the nested filter |
| `none`          | `FooWhereInput` | No related items match the nested filter   |

#### many: false

| **Filter name** | **Type**        | **Description**           |
| --------------- | --------------- | ------------------------- |
| `foo`           | `FooWhereInput` | Matches the nested filter |

## Virtual type

### virtual

The `virtual` field type does not support filters.

## File types

### file

The `file` field type does not support filters.

### image

The `image` field type does not support filters.

## Related resources

{% related-content %}
{% well
heading="Query Filters Guide"
href="/docs/guides/filters" %}
Query filters are an integral part of Keystone’s powerful GraphQL APIs. This guide will show you how to use filters to get the data you need from your system.
{% /well %}
{% /related-content %}
