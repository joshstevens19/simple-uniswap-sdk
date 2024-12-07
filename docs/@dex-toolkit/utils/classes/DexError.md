[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / DexError

# Class: DexError

Custom error class for DEX-related errors with additional context and typing

## Extends

- `Error`

## Constructors

### new DexError()

> **new DexError**(`message`, `code`, `context`?, `originalError`?): [`DexError`](DexError.md)

#### Parameters

• **message**: `string`

• **code**: [`ErrorCodes`](../enumerations/ErrorCodes.md)

• **context?**: `Error` \| [`DexErrorContext`](../type-aliases/DexErrorContext.md)

• **originalError?**: `Error`

#### Returns

[`DexError`](DexError.md)

#### Overrides

`Error.constructor`

#### Defined in

packages/utils/src/errors/dex-error.ts:34

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/.pnpm/typescript@5.5.4/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### code

> `readonly` **code**: [`ErrorCodes`](../enumerations/ErrorCodes.md)

Error code identifying the type of error

#### Defined in

packages/utils/src/errors/dex-error.ts:17

***

### context?

> `readonly` `optional` **context**: [`DexErrorContext`](../type-aliases/DexErrorContext.md)

Additional context about the error

#### Defined in

packages/utils/src/errors/dex-error.ts:22

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/.pnpm/typescript@5.5.4/node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> `readonly` **name**: `"DexError"` = `'DexError'`

#### Overrides

`Error.name`

#### Defined in

packages/utils/src/errors/dex-error.ts:12

***

### originalError?

> `readonly` `optional` **originalError**: `Error`

Original error if this error wrapped another error

#### Defined in

packages/utils/src/errors/dex-error.ts:32

***

### originalStack?

> `readonly` `optional` **originalStack**: `string`

Stack trace if available

#### Defined in

packages/utils/src/errors/dex-error.ts:27

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/.pnpm/typescript@5.5.4/node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/.pnpm/@types+node@22.6.1/node\_modules/@types/node/globals.d.ts:143

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/.pnpm/@types+node@22.6.1/node\_modules/@types/node/globals.d.ts:145

## Methods

### toJSON()

> **toJSON**(): `Record`\<`string`, `unknown`\>

Creates a plain object representation of the error

#### Returns

`Record`\<`string`, `unknown`\>

#### Defined in

packages/utils/src/errors/dex-error.ts:88

***

### toString()

> **toString**(): `string`

Creates a string representation of the error including context

#### Returns

`string`

#### Defined in

packages/utils/src/errors/dex-error.ts:71

***

### withContext()

> **withContext**(`additionalContext`): [`DexError`](DexError.md)

Adds additional context to an existing error

#### Parameters

• **additionalContext**: [`DexErrorContext`](../type-aliases/DexErrorContext.md)

#### Returns

[`DexError`](DexError.md)

#### Defined in

packages/utils/src/errors/dex-error.ts:109

***

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

node\_modules/.pnpm/@types+node@22.6.1/node\_modules/@types/node/globals.d.ts:136

***

### isDexError()

> `static` **isDexError**(`error`): `error is DexError`

Helper method to determine if an unknown error is a DexError

#### Parameters

• **error**: `unknown`

#### Returns

`error is DexError`

#### Defined in

packages/utils/src/errors/dex-error.ts:121
