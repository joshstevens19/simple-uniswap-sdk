import type { ChainId } from '@chain-toolkit/schemas'
import type { DexType, Token, VersionTag } from '@dex-toolkit/types'

type NativeTokens = {
  nativeCoin: Token
  nativeWrapped: Token
}

type TokensOverridable = {
  primaryToken?: Token
  noAllowanceToken?: Token
  noDirectToken?: Token
  stableToken?: Token
}

type Tokens = NativeTokens & Required<TokensOverridable>

type ProtocolInfoBase = {
  versionTag: VersionTag
  version: { major: number; minor: number; patch: number }
  tokenOverrides?: TokensOverridable
}

type ProtocolInfoV2 = ProtocolInfoBase & {
  pairAddresses: {
    primaryToWrapped: string
    secondaryToWrapped: string
    stableToWrapped: string
    fee: number
  }
}

type PoolInfo = {
  address: string
  feeTier: number
}

type ProtocolInfoV3 = ProtocolInfoBase & {
  poolAddresses: {
    primaryToWrapped: PoolInfo
    secondaryToWrapped: PoolInfo
    stableToWrapped: PoolInfo
  }
}

export type DexTestCase = {
  chainId: ChainId
  dexType: DexType
  tokens: Tokens
  versions: {
    v2?: ProtocolInfoV2[]
    v3?: ProtocolInfoV3[]
  }
}

export type DexTestCaseFilter = {
  enabledDexes?: DexType[]
  enabledChainIds?: ChainId[]
  enabledProtocols?: {
    v2?: boolean
    v3?: boolean
  }
  enabledVersions?: {
    [key in DexType]?: {
      v2?: string[]
      v3?: string[]
    }
  }
}
