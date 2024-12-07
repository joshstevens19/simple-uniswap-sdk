import { ErrorCodes } from './error-codes'

/**
 * Represents additional context that can be attached to a DexError
 */
export type DexErrorContext = Record<string, unknown>

/**
 * Custom error class for DEX-related errors with additional context and typing
 */
export class DexError extends Error {
  override readonly name = 'DexError'

  /**
   * Error code identifying the type of error
   */
  public readonly code: ErrorCodes

  /**
   * Additional context about the error
   */
  public readonly context?: DexErrorContext

  /**
   * Stack trace if available
   */
  public readonly originalStack?: string

  /**
   * Original error if this error wrapped another error
   */
  public readonly originalError?: Error

  constructor(
    message: string,
    code: ErrorCodes,
    context?: DexErrorContext | Error,
    originalError?: Error,
  ) {
    // If context is an Error, treat it as originalError
    if (context instanceof Error) {
      originalError = context
      context = undefined
    }

    const errorMessage = originalError
      ? `${message}: ${originalError.message}`
      : message

    super(errorMessage)

    this.code = code
    this.context = context
    this.originalError = originalError

    // Capture original stack if available
    if (originalError?.stack) {
      this.originalStack = originalError.stack
    }

    // Ensure prototype chain is properly maintained
    Object.setPrototypeOf(this, DexError.prototype)

    // Capture stack trace
    Error.captureStackTrace?.(this, this.constructor)
  }

  /**
   * Creates a string representation of the error including context
   */
  public override toString(): string {
    let result = `DexError: ${this.message} (Code: ${this.code})`

    if (this.context && Object.keys(this.context).length > 0) {
      result += `\nContext: ${JSON.stringify(this.context, null, 2)}`
    }

    if (this.originalError) {
      result += `\nCaused by: ${this.originalError.message}`
    }

    return result
  }

  /**
   * Creates a plain object representation of the error
   */
  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      stack: this.stack,
      originalStack: this.originalStack,
      originalError: this.originalError
        ? {
            message: this.originalError.message,
            name: this.originalError.name,
            stack: this.originalError.stack,
          }
        : undefined,
    }
  }

  /**
   * Adds additional context to an existing error
   */
  public withContext(additionalContext: DexErrorContext): DexError {
    return new DexError(
      this.message,
      this.code,
      { ...this.context, ...additionalContext },
      this.originalError,
    )
  }

  /**
   * Helper method to determine if an unknown error is a DexError
   */
  public static isDexError(error: unknown): error is DexError {
    return error instanceof DexError
  }
}

/**
 * Helper function to wrap any error as a DexError
 */
export function wrapError(
  error: unknown,
  code: ErrorCodes,
  context?: DexErrorContext,
): DexError {
  if (error instanceof DexError) {
    return context ? error.withContext(context) : error
  }

  const message =
    error instanceof Error ? error.message : 'An unknown error occurred'

  return new DexError(
    message,
    code,
    context,
    error instanceof Error ? error : undefined,
  )
}
