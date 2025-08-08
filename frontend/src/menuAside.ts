import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/artworks/artworks-list',
    label: 'Artworks',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPalette' in icon ? icon['mdiPalette' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ARTWORKS'
  },
  {
    href: '/challenges/challenges-list',
    label: 'Challenges',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFlagCheckered' in icon ? icon['mdiFlagCheckered' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CHALLENGES'
  },
  {
    href: '/communities/communities-list',
    label: 'Communities',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccountGroup' in icon ? icon['mdiAccountGroup' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COMMUNITIES'
  },
  {
    href: '/events/events-list',
    label: 'Events',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCalendar' in icon ? icon['mdiCalendar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_EVENTS'
  },
  {
    href: '/journals/journals-list',
    label: 'Journals',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiNotebook' in icon ? icon['mdiNotebook' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_JOURNALS'
  },
  {
    href: '/meditations/meditations-list',
    label: 'Meditations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMeditation' in icon ? icon['mdiMeditation' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MEDITATIONS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
