import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { firstPagePath } from './data/brandbookData'
import { findPage } from './data/contentIndex'
import { BrandbookLayout } from './components/BrandbookLayout'

function PageRoute() {
  const params = useParams<{ section: string; page: string }>()
  const lookup = findPage(params.section ?? '', params.page ?? '')

  if (!lookup) {
    return <Navigate to={firstPagePath} replace />
  }

  return <BrandbookLayout pageLookup={lookup} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={firstPagePath} replace />} />
      <Route path=":section/:page" element={<PageRoute />} />
      <Route path="*" element={<Navigate to={firstPagePath} replace />} />
    </Routes>
  )
}
