import { createElement } from 'react'
import { courseIcon, serviceIcon } from '@/lib/icons'

// The icon for a service or course record (see lib/icons.js); other props go to the icon.
export function ServiceIcon({ service, ...props }) {
  return createElement(serviceIcon(service), { 'aria-hidden': true, ...props })
}

export function CourseIcon({ course, ...props }) {
  return createElement(courseIcon(course), { 'aria-hidden': true, ...props })
}
