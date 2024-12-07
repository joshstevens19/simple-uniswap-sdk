# Contributing to Dex-Toolkit

Thank you for your interest in contributing to Dex-Toolkit! We appreciate all contributions, big or small.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
   - [Adding Network Configurations](#adding-network-configurations)
   - [Adding DEX Configurations](#adding-dex-configurations)
   - [Adding Token Configurations](#adding-token-configurations)
   - [Adding Contracts](#adding-contracts)
3. [Code Style](#code-style)
4. [Pre Commit](#pre-commit)
5. [Need Help?](#need-help)

---

## Getting Started

1. **Fork the repository:** Click the "Fork" button in the top-right corner of the repository page.
2. **Clone your fork:**

   ```bash
   git clone https://github.com/niZmosis/dex-toolkit.git
   ```

3. **Create a branch:**

   ```bash
   git checkout -b my-new-branch
   ```

4. **Run the following command to set up the project:**

   ```bash
   pnpm setup:initial
   ```

5. **Start watching all packages:**

   ```bash
   pnpm start
   ```

6. **Make your changes:**

   - Follow the code style guidelines.
   - Write clear commit messages.

7. **Push your changes:**

   ```bash
   git push origin my-new-branch
   ```

8. **Open a pull request:** Go to the original repository and click "New pull request."

---

## How to Contribute

Check the [TODO.md](TODO.md) file to see the current list of tasks.

### Adding Network Configurations

1. Add the Chain ID to [chainIds.ts](packages/utils/src/chains/chainIds.ts)

2. Add the Network Config to [networks](packages/utils/src/chains/networks/index.ts)

   - Ensure to add the Network config to `getChainConfig` at the bottom of the file.
   - If adding a new DEX, export it in the [barrel file](packages/utils/src/chains/networks/index.ts).

3. Add the Network Icon to [images](packages/utils/src/chains/images/index.ts)

4. Add the created Network Config to `getChainConfig` in [chainConfigs](packages/utils/src/chains/chainConfigs.ts)

5. Run Tests:

   ```bash
   pnpm test:utils:networks
   ```

6. Update the compatibility table in the README.md [README.md](README.md)

---

### Adding DEX Configurations

1. Add the DEX Type to [dex.types.ts](packages/types/src/dex.types.ts).

2. Add the DEX Type to the Map in [dex.utils.ts](packages/utils/src/utils/dex.utils.ts).

3. Add the DEX Config to [configs/index.ts](packages/utils/src/exchanges/configs/index.ts):

   - Ensure to add the DEX config to `getDexConfig` and `getAllDexConfigs` at the bottom of the file.
   - If adding a new DEX, export it in the [barrel file](packages/utils/src/exchanges/configs/index.ts).

4. Check contracts for method names and map them if needed. See [traderJoeSwap.dex.ts](packages/utils/src/exchanges/configs/traderJoeSwap.dex.ts) for reference.

5. Run Tests:

   ```bash
   pnpm test:utils:dexs
   ```

6. Update the compatibility table in the README.md [README.md](README.md).

---

### Adding Token Configurations

1. Add the Token Config to [configs/index.ts](packages/utils/src/tokens/configs/index.ts):

   - Ensure the token config is added to `getTokenForChainId` at the bottom of the file.
   - If adding a new token, export it in the [barrel file](packages/utils/src/tokens/configs/index.ts).

2. Add the Token Config to `tokenClasses` in [tokenConfigs.ts](packages/utils/src/tokens/tokenConfigs.ts).

3. Run Tests:

   ```bash
   pnpm test:utils:tokens
   ```

4. Update the compatibility table in the README.md [README.md](README.md).

---

### Adding Contracts

1. Add ABI files to [abis](packages/utils/src/abis):

   - Files can be either `.json` or `.ts` exporting a `JSONFragment` array.

2. Generate ABI typings and classes:

   ```bash
   cd packages/utils && pnpm gen:abis
   ```

   - Typings output: `packages/types/src/abis/types`.
   - Classes output: `packages/contract/src`.

---

## Code Style

- Keep items in **alphabetical order** where applicable.

---

## Pre Commit

Before committing, run

```bash
pnpm precommit
```

to preform all linting, formatting, docs, and tests.

## Need Help?

If you have any questions or need help getting started, feel free to open an issue or contact us on [communication channel, e.g., Discord].
