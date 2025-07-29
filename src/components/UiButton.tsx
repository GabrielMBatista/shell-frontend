'use client'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'disabled'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function UIButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseStyles = {
    fontFamily: 'var(--font-base)',
    fontWeight: 'var(--font-weight-medium)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-xs)'
  }

  const sizeStyles = {
    sm: {
      padding: `var(--space-xs) var(--space-sm)`,
      fontSize: 'var(--font-size-sm)',
      borderRadius: 'var(--border-radius-sm)',
      minHeight: '32px'
    },
    md: {
      padding: `var(--space-sm) var(--space-md)`,
      fontSize: 'var(--font-size-md)',
      borderRadius: 'var(--border-radius-md)',
      minHeight: '40px'
    },
    lg: {
      padding: `var(--space-md) var(--space-lg)`,
      fontSize: 'var(--font-size-lg)',
      borderRadius: 'var(--border-radius)',
      minHeight: '48px'
    }
  }

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? 'var(--color-disabled)' : 'var(--color-primary)',
      color: 'white',
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      ':hover': {
        backgroundColor: disabled ? 'var(--color-disabled)' : 'var(--color-primary-hover)'
      }
    },
    secondary: {
      backgroundColor: disabled ? 'var(--color-disabled)' : 'var(--color-secondary)',
      color: 'white',
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      ':hover': {
        opacity: disabled ? 1 : 0.9
      }
    },
    ghost: {
      backgroundColor: 'transparent',
      color: disabled ? 'var(--color-disabled)' : 'var(--color-text)',
      border: `1px solid ${disabled ? 'var(--color-disabled)' : 'var(--color-border)'}`,
      ':hover': {
        backgroundColor: disabled ? 'transparent' : 'var(--color-hover)'
      }
    },
    disabled: {
      backgroundColor: 'var(--color-disabled)',
      color: '#666',
      cursor: 'not-allowed'
    }
  }

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[disabled ? 'disabled' : variant]
  }

  return (
    <button
      style={combinedStyles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`ui-button ${className}`}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.opacity = '0.9'
        } else if (!disabled && variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'var(--color-hover)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)'
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.opacity = '1'
        } else if (!disabled && variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {children}
    </button>
  )
}