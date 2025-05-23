import { DynamicIcon } from 'lucide-react/dynamic'
import { ComponentProps } from 'react'

export type DynamicIconName = ComponentProps<typeof DynamicIcon>['name']
