import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import UpdateIcon from '@mui/icons-material/Update'
import {
  Box,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'

import { useRouter } from 'next/router'
import useSWR from 'swr'
import ArticleInfo from './metaListItem'
import MetaListItem from './metaListItem'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  constnt: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
  }
}

const ArticleDetail: NextPage = () => {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/'
  const { id } = router.query

  const { data, error } = useSWR(id ? url + id : null, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const article: ArticleProps = camelcaseKeys(data)

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        pb: 6,
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 6, pb: 3 }}>
          <Box sx={{ maxWidth: 840, m: 'auto', textAlign: 'center' }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { sx: 21, sm: 25 },
                fontWeight: 'bold',
              }}
            >
              {article.title}
            </Typography>
          </Box>
          <Typography
            component="p"
            align="center"
            sx={{
              display: {
                sx: 'block',
                lg: 'none',
              },
              color: '#6e7b85',
              mt: '20px',
            }}
          >
            {article.createdAt}に公開
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '0 24px' }}>
          <Box sx={{ width: '100%' }}>
            <Card
              sx={{
                boxShadow: 'none',
                borderRadius: '12px',
                maxWidth: 840,
                m: '0 auto',
              }}
            >
              <Box
                sx={{
                  padding: { xs: '0 24px 24px 24px', sm: '0 40px 40px 40px' },
                  marginTop: { xs: '24px', sm: '40px' },
                }}
              >
                <MarkdownText content={article.title}></MarkdownText>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              width: 300,
              minWidth: 300,
            }}
          >
            <Card sx={{ boxShadow: 'none', borderRadius: '12px' }}>
              <List sx={{ color: '#6e7b85' }}>
                <MetaListItem
                  icon={<PersonIcon />}
                  label="著者"
                  value={article.user.name}
                  divider={true}
                />
                <MetaListItem
                  icon={<ArticleIcon />}
                  label="公開"
                  value={article.createdAt}
                  divider={true}
                />
                <MetaListItem
                  icon={<UpdateIcon />}
                  label="本文更新"
                  value={article.updatedAt}
                  divider={false}
                />
              </List>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ArticleDetail
