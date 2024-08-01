import { Container } from '@chakra-ui/layout'
import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content'


export default function MainArea() {
  return (
    <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
      <Sidebar />
      <Content />
    </Container>
  )
}