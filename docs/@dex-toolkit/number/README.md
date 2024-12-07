**@dex-toolkit/number v1.0.0** • [**Docs**](globals.md)

***

[Documentation v1.0.0](../../packages.md) / @dex-toolkit/number

# DexNumber

DexNumber is a numeric class extending BigNumber.js that manages decimal arithmetic with state-aware precision, primarily for blockchain and DeFi applications. It handles automatic decimal scaling, maintains atomic/decimal state tracking, and provides consistent conversion between common blockchain numeric representations (wei/ether, decimal/atomic, etc). Built for scenarios requiring high-precision decimal math with proper decimal place management.

## Table of Contents

- **[Features](#features)**
- **[Installation](#installation)**
- **[Core Concepts](#core-concepts)**
  - [Decimal Inheritance](#decimal-inheritance)
  - [State Management](#state-management)
  - [Precision Handling](#precision-handling)
- **[Basic Usage](#basic-usage)**
  - [Initialization](#initialization)
  - [Token Amount Handling](#token-amount-handling)
  - [State Manipulation](#state-manipulation)
- **[Advanced Features](#advanced-features)**
  - [Cross-Decimal Operations](#cross-decimal-operations)
  - [Price Impact Calculations](#price-impact-calculations)
  - [Pool Ratio Calculations](#pool-ratio-calculations)
- **[Format Conversions](#format-conversions)**
  - [toTradeFormat Options](#totradeformat-options)
  - [String Formatting](#string-formatting)
  - [Blockchain Formats](#blockchain-formats)
- **[Mathematical Operations](#mathematical-operations)**
  - [Basic Arithmetic](#basic-arithmetic)
  - [Advanced Mathematics](#advanced-mathematics)
  - [Batch Operations](#batch-operations)
- **[Comparison Methods](#comparison-methods)**
- **[Best Practices](#best-practices)**
- **[TypeScript Support](#typescript-support)**
- **[Contributing](#contributing)**

## Features

### 🎯 Precision & Decimal Management

- 🔢 **Decimal Inheritance**: First operand's decimals determine result precision, critical for token calculations
- ⚡ **High-Precision Core**: 60 decimal place precision with configurable rounding modes
- ⚖️ **Cross-Decimal Handling**: Automatic scaling between different token decimals (e.g., 18 decimal ETH to 6 decimal USDC)
- 🛡️ **Precision Guards**: Prevents common decimal errors in DeFi calculations

### 🏷️ Blockchain State Management

- 🔄 **Atomic/Decimal States**: Seamless handling of both contract values (wei) and human-readable amounts (ether)
- 🎭 **Auto State Detection**: Maintains awareness of shifted/unshifted states during operations
- 🔐 **Immutable Operations**: Guarantees value consistency in complex DeFi calculations
- ✅ **Validation**: Ensures correct decimal state for contract interactions

### 💱 Format & Conversion

- ⚗️ **Contract Ready**: Direct conversion to formats needed for smart contract calls
- 🔄 **Universal Parsing**: Handles all common blockchain number formats (BigNumber, Ethers BigNumber, bigint, hex)
- 📏 **Token Units**: Built-in support for wei, gwei, ether, and custom decimal places
- 🎨 **Display Formatting**: Locale-aware formatting for UI display with decimal place control

### 🛠️ Developer Experience

- 🏗️ **Static Factories**: Intuitive creation methods for different number states
- 📝 **TypeScript Ready**: Comprehensive type definitions for safe DApp development
- 🔍 **Debugging Support**: Clear state tracking and value inspection
- 📚 **Predictable API**: Consistent behavior across all mathematical operations

### ⚙️ Architecture Features

- 🧮 **BigNumber Foundation**: Built on proven BigNumber.js library for reliable calculations
- ⚡ **Performance**: Optimized for high-volume DeFi calculations
- 🧪 **Testing Friendly**: Deterministic results for reliable test assertions
- 🔌 **Ethers.js Integration**: Seamless interaction with the most popular Ethereum library

## Installation

```bash
pnpm add @dex-toolkit/number
# or
npm install @dex-toolkit/number
# or
yarn add @dex-toolkit/number
# or
bun add @dex-toolkit/number
```

## Core Concepts

### Decimal Inheritance

One of the most important rules in DexNumber is decimal inheritance. The decimals of the result will always match the decimals of the first operand in any operation. The decimals are for shift management and display/formatting. All operations work with and store 60 decimal places.

```typescript
const num18 = DexNumber.fromUnshifted('1.5', 18);  // 18 decimals
const num6 = DexNumber.fromUnshifted('2.5', 6);    // 6 decimals

// Result will have 18 decimals
const result1 = num18.multipliedBy(num6);
console.log(result1.decimals); // 18

// Result will have 6 decimals
const result2 = num6.multipliedBy(num18);
console.log(result2.decimals); // 6

// Chaining operations
const result3 = num18.multipliedBy(num6).dividedBy(num6);
console.log(result3.decimals); // 18

```

### State Management

DexNumber maintains three possible states:

- `shifted`: Values in their smallest unit (e.g., wei)
- `unshifted`: Human-readable values (e.g., ETH)
- `neutral`: Initial state before shifting operations

```typescript
const amount = DexNumber.fromUnshifted('1.5', 18);
console.log(amount.shiftedState);  // 'unshifted'

const shifted = amount.shift();
console.log(shifted.shiftedState);  // 'shifted'
console.log(shifted.toString());    // '1500000000000000000'
```

Just like decimal inheritance, the results shifted state will be the same as the first operand in any operation.

```typescript
const num18 = DexNumber.fromUnshifted('1.5', 18);  // 18 decimals
const num6 = DexNumber.fromShifted('2500000', 6);    // 6 decimals

// Result will be unshifted
const result1 = num18.multipliedBy(num6);
console.log(result1.decimals); // 18
console.log(result1.shiftedState); // 'unshifted'

// Result will be shifted
const result2 = num6.multipliedBy(num18);
console.log(result2.decimals); // 6
console.log(result2.shiftedState); // 'shifted'
```

### Precision Handling

DexNumber uses BigNumber.js with extended precision settings:

- 60 decimal places for internal calculations
- ROUND_DOWN as default rounding mode
- Automatic scaling for cross-decimal operations

## Basic Usage

### Initialization

```typescript
// From human-readable values
const amount1 = DexNumber.fromUnshifted('1.5', 18);
const amount2 = DexNumber.fromUnshifted('100', 'gwei');  // 9 decimals

// From atomic values (e.g., wei)
const amount3 = DexNumber.fromShifted('1500000000000000000', 18);
const amount4 = DexNumber.fromShifted('100000000000', 'gwei');

// From other formats
const amount5 = DexNumber.fromBigInt(BigInt('1500000000000000000'), 18);
const amount6 = DexNumber.fromString('1.5', 18, 'unshifted');
```

### Token Amount Handling

```typescript
// USDC Example (6 decimals)
const usdc = DexNumber.fromUnshifted('100.50', 6);

// Get atomic units for contract calls
const atomic = usdc.shift();
console.log(atomic.toString());  // '100500000'

// Convert back to human-readable
const readable = atomic.unshift();
console.log(readable.toString());  // '100.5'

// Format with specific decimals
console.log(readable.toReadableString(2));  // '100.50'
```

### State Manipulation

```typescript
const token = DexNumber.fromUnshifted('1234.5678', 18);

// Check states
console.log(token.isUnshifted());  // true
console.log(token.isShifted());    // false
console.log(token.isNeutral());    // false

// Convert between states
const atomic = token.shift();
console.log(atomic.toWeiString());  // '1234567800000000000000'

const decimal = atomic.unshift();
console.log(decimal.toDecimalString());  // '1234.5678'
```

## Advanced Features

### Cross-Decimal Operations

```typescript
// Different token decimals
const dai = DexNumber.fromUnshifted('100', 18);    // 18 decimals
const usdc = DexNumber.fromUnshifted('100', 6);    // 6 decimals

// Result inherits decimals from first operand
const ratio1 = dai.dividedBy(usdc);    // 18 decimals result
const ratio2 = usdc.dividedBy(dai);    // 6 decimals result

// Mixed states work automatically
const shifted = DexNumber.fromShifted('1000000', 6);
const unshifted = DexNumber.fromUnshifted('1.5', 18);
const result = shifted.multipliedBy(unshifted);  // Handles conversion internally
```

### Price Impact Calculations

```typescript
// Calculate price impact across multiple hops
const reserve0 = DexNumber.fromUnshifted('1000000', 18);
const reserve1 = DexNumber.fromUnshifted('1000', 18);
const amount = DexNumber.fromUnshifted('1000', 18);
const fee = DexNumber.fromUnshifted('0.003', 18);  // 0.3%

const amountWithFee = amount.multipliedBy(
  DexNumber.fromUnshifted('1', amount.decimals).minus(fee)
);
const numerator = amountWithFee.multipliedBy(reserve1);
const denominator = reserve0.plus(amountWithFee);
const outputAmount = numerator.dividedBy(denominator);
```

### Pool Ratio Calculations

```typescript
// Calculate precise pool share percentage
const userLiquidity = DexNumber.fromUnshifted('15', 18);
const totalLiquidity = DexNumber.fromUnshifted('105', 18);

const sharePercentage = userLiquidity
  .dividedBy(totalLiquidity)
  .multipliedBy(DexNumber.fromUnshifted('100', 18));

console.log(sharePercentage.toDecimalString());  // '14.285714285714285714'
```

## Format Conversions

### toTradeFormat Options

```typescript
const number = DexNumber.fromUnshifted('1234.5678', 18);

const formats = {
  readable: number.toTradeFormat({ 
    type: 'readable',
    options: { 
      decimalPlaces: 2,
      locales: 'de-DE'
    }
  }), // '1.234,57'
  
  decimal: number.toTradeFormat({ 
    type: 'decimal',
    options: { decimalPlaces: 4 }
  }), // '1234.5678'
  
  wei: number.toTradeFormat({ type: 'wei' }),
  hex: number.toTradeFormat({ type: 'hex' }),
  bigint: number.toTradeFormat({ type: 'bigint' }),
  ethers: number.toTradeFormat({ type: 'ethers' }),
  bignumber: number.toTradeFormat({ type: 'bignumber' })
};
```

### String Formatting

```typescript
const amount = DexNumber.fromUnshifted('1234.5678', 18);

// Different format options
console.log(amount.toReadableString());     // '1,234.567800000000000000'
console.log(amount.toReadableString(2));    // '1,234.57'
console.log(amount.toDecimalString(4));     // '1234.5678'
console.log(amount.toWeiString());          // '1234567800000000000000'
console.log(amount.toHexString());          // '0x422ca8b0a00a425000000'

// Locale-specific formatting
console.log(amount.toReadableString(2));  // '1,234.57'
console.log(amount.toReadableString(2, 'de-DE'));  // '1.234,57'
console.log(amount.toReadableString(2, 'fr-FR'));  // '1 234,57'
```

### Blockchain Formats

```typescript
const amount = DexNumber.fromUnshifted('1.5', 18);

// Convert for contract interactions
const ethersBN = amount.toEthersBigNumber();
const bigInt = amount.toBigInt();
const hexString = amount.toHexString();

// For storage/serialization
const serialized = amount.toSerialized();
const restored = DexNumber.fromSerialized(serialized);
```

### Web3.js (BN.js) Interoperability

You can easily convert between BN.js and DexNumber using the existing static methods:

```typescript
import BN from 'bn.js';

// Converting from BN to DexNumber
const bnValue = new BN('1000000000000000000'); // 1 ETH in wei
const dexNumber = DexNumber.fromShifted(bnValue.toString(), 18);

// Converting from DexNumber back to BN
const dexValue = DexNumber.fromUnshifted('1.5', 18);
const backToBN = new BN(dexValue.shift().toFixed());

// Working with Web3.js values
const web3Amount = new BN('500000000'); // value from Web3.js
const dexAmount = DexNumber.fromShifted(web3Amount.toString(), 6); // e.g., USDC
console.log(dexAmount.unshift().toString()); // '500'

// Converting back for Web3.js contract calls
const dexResult = DexNumber.fromUnshifted('750.5', 6);
const web3Ready = new BN(dexResult.shift().toFixed());
```

## Mathematical Operations

Check out the [tests](../../_media/dex-number.spec.ts) for more examples.

### Basic Arithmetic

```typescript
const a = DexNumber.fromUnshifted('10.5', 18);
const b = DexNumber.fromUnshifted('3.2', 18);

console.log(a.plus(b).toString());         // '13.7'
console.log(a.minus(b).toString());        // '7.3'
console.log(a.multipliedBy(b).toString()); // '33.6'
console.log(a.dividedBy(b).toString());    // '3.28125'
```

### Advanced Mathematics

```typescript
const num = DexNumber.fromUnshifted('10.5', 18);

console.log(num.pow(2).toString());        // '110.25'
console.log(num.sqrt().toString());        // '3.24037...'
console.log(num.absoluteValue().toString()); // '10.5'

// Precision control
console.log(num.decimalPlaces(2).toString());  // '10.50'
console.log(num.integerValue().toString());    // '10'
```

### Batch Operations

```typescript
const decimals = 18;
const numbers = ['10', '20', '30'].map(n => 
  DexNumber.fromUnshifted(n, decimals)
);

console.log(DexNumber.max(decimals, ...numbers).toString());   // '30'
console.log(DexNumber.min(decimals, ...numbers).toString());   // '10'
console.log(DexNumber.sum(decimals, ...numbers).toString());   // '60'
```

## Comparison Methods

```typescript
const x = DexNumber.fromUnshifted('100', 18);
const y = DexNumber.fromUnshifted('150', 18);

console.log(x.isLessThan(y));              // true
console.log(x.isGreaterThanOrEqualTo(y));  // false
console.log(x.isEqualTo(y));               // false

// Works across different decimals
const z = DexNumber.fromUnshifted('100', 6);
console.log(x.isEqualTo(z));               // true
```

## Best Practices

1. **Always Use Appropriate Initialization**:

   ```typescript
   // For human input/display
   const userAmount = DexNumber.fromUnshifted('1.5', 18);
   
   // For contract data
   const contractAmount = DexNumber.fromShifted('1500000000000000000', 18);
   ```

2. **Match Token Decimals**:

   ```typescript
   const usdc = DexNumber.fromUnshifted('100', 6);   // USDC has 6 decimals
   const dai = DexNumber.fromUnshifted('100', 18);   // DAI has 18 decimals
   ```

3. **Use Appropriate Conversion Methods**:

   ```typescript
   // For contract calls
   amount.toWeiString();       // Safe for any size
   amount.toEthersBigNumber(); // For ethers.js v4 and v5 integration
   amount.toBigInt();          // For bigint operations
   amount.toHexString();       // For hex input
   ```

4. **Handle Cross-Decimal Operations Carefully**:

   ```typescript
   // Remember: result inherits decimals from first operand
   const ratio = usdc.dividedBy(dai);  // Result will have 6 decimals
   ```

## TypeScript Support

```typescript
import { 
  DexNumber, 
  DexNumberUnit, 
  DexNumberState,
  SerializedDexNumber,
  TradeFormat,
  TradeFormatValue
} from '@dex-toolkit/number';

// Type-safe initialization
const amount: DexNumber = DexNumber.fromUnshifted('1.5', 18);
const unit: DexNumberUnit = 'ether';
const state: DexNumberState = amount.shiftedState;

// Type-safe format conversion
const formatted: TradeFormatValue<'readable'> = amount.toTradeFormat({
  type: 'readable',
  options: { decimalPlaces: 2 }
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](../../_media/LICENSE) file for details.
