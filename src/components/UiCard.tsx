'use client'
import React from 'react'

interface CardProps {
  title: string
  description: string
  image?: string
  technologies?: string[]
  actions?: React.ReactNode
  featured?: boolean
  className?: string
}

export default function UICard({ 
  title, 
  description, 
  image, 
  technologies = [], 
  actions,
  featured = false,
  className = ''
}: CardProps) {
  const cardStyles = {
    backgroundColor: 'var(--color-surface)',
    border: `1px solid var(--color-border)`,
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden' as const,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative' as const
  }

  const imageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover' as const,
    transition: 'transform 0.3s ease'
  }

  const contentStyles = {
    padding: 'var(--space-lg)'
  }

  const titleStyles = {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 'var(--font-weight-bold)',
    fontFamily: 'var(--font-base)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-sm)',
    lineHeight: 1.3
  }

  const descriptionStyles = {
    fontSize: 'var(--font-size-md)',
    fontFamily: 'var(--font-base)',
    color: 'var(--color-text)',
    lineHeight: 1.6,
    marginBottom: 'var(--space-md)',
    opacity: 0.8
  }

  const techListStyles = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--space-xs)',
    marginBottom: 'var(--space-md)'
  }

  const techTagStyles = {
    padding: `var(--space-xs) var(--space-sm)`,
    backgroundColor: 'var(--color-surface-dark)',
    color: 'var(--color-on-surface-dark)',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'var(--font-base)',
    borderRadius: 'var(--border-radius-sm)',
    fontWeight: 'var(--font-weight-medium)'
  }

  const featuredBadgeStyles = {
    position: 'absolute' as const,
    top: 'var(--space-md)',
    right: 'var(--space-md)',
    padding: `var(--space-xs) var(--space-sm)`,
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'var(--font-base)',
    fontWeight: 'var(--font-weight-medium)',
    borderRadius: 'var(--border-radius)',
    zIndex: 10
  }

  const actionsStyles = {
    display: 'flex',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap' as const
  }

  return (
    <div 
      style={cardStyles}
      className={`ui-card ${className}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        const img = e.currentTarget.querySelector('img')
        if (img) {
          img.style.transform = 'scale(1.05)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        const img = e.currentTarget.querySelector('img')
        if (img) {
          img.style.transform = 'scale(1)'
        }
      }}
    >
      {featured && (
        <div style={featuredBadgeStyles}>
          Destaque
        </div>
      )}
      
      {image && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={image} alt={title} style={imageStyles} />
        </div>
      )}
      
      <div style={contentStyles}>
        <h3 style={titleStyles}>{title}</h3>
        <p style={descriptionStyles}>{description}</p>
        
        {technologies.length > 0 && (
          <div style={techListStyles}>
            {technologies.map((tech, index) => (
              <span key={index} style={techTagStyles}>
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {actions && (
          <div style={actionsStyles}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}