import Link from 'next/link'
import { CircleIcon, StarIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { site } from '@/constants/site'
import dayjs from 'dayjs'

export default async function NotFound() {
  const repo = await fetch(
    `${process.env.GITHUB_HOST}/repos/docker-reply/website`,
    { next: { revalidate: 60 * 3 * 60 * 1000 } }
  )
    .then((response) => response.json())
    .then((response) => (!response.message ? response : {}))

  return (
    <AspectRatio
      ratio={16 / 9}
      className="h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-violet-300 to-transparent"
    >
      <Card className="w-[410px]">
        <CardHeader className="grid grid-cols-[1fr_76px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-base">{site.name}</CardTitle>
            <CardDescription>{site.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Link href={site.links.github} target="_blank">
              <Button variant="secondary" className="px-3 shadow-none">
                <StarIcon className="mr-2 h-4 w-4" />
                Star
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              {repo.language}
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" />
              {repo.stargazers_count}
            </div>
            <div>Updated {dayjs(repo.updated_at).format('MMMM DD')}</div>
          </div>
        </CardContent>
      </Card>
      <Link replace href="/">
        <Button>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          back
        </Button>
      </Link>
    </AspectRatio>
  )
}
