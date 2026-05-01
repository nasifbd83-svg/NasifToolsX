import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ToolPageWrapper } from './pages/ToolPage';
import { TOOLS } from './lib/tools-config';

// Import Tools
import { WordCounter } from './components/tools/text/WordCounter';
import { CaseConverter } from './components/tools/text/CaseConverter';
import { DuplicateRemover } from './components/tools/text/DuplicateRemover';
import { ImageCompressor } from './components/tools/image/ImageCompressor';
import { ImageResizer } from './components/tools/image/ImageResizer';
import { ImageConverter } from './components/tools/image/ImageConverter';
import { PdfMerge } from './components/tools/pdf/PdfMerge';
import { PdfSplit } from './components/tools/pdf/PdfSplit';
import { PdfToImage } from './components/tools/pdf/PdfToImage';

// Import Static Pages
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Tool Routes */}
          <Route path="/word-counter" element={<ToolPageWrapper><WordCounter /></ToolPageWrapper>} />
          <Route path="/case-converter" element={<ToolPageWrapper><CaseConverter /></ToolPageWrapper>} />
          <Route path="/duplicate-remover" element={<ToolPageWrapper><DuplicateRemover /></ToolPageWrapper>} />
          
          <Route path="/image-compressor" element={<ToolPageWrapper><ImageCompressor /></ToolPageWrapper>} />
          <Route path="/image-resizer" element={<ToolPageWrapper><ImageResizer /></ToolPageWrapper>} />
          <Route path="/jpg-to-png" element={<ToolPageWrapper><ImageConverter from="JPG" to="PNG" /></ToolPageWrapper>} />
          <Route path="/png-to-jpg" element={<ToolPageWrapper><ImageConverter from="PNG" to="JPG" /></ToolPageWrapper>} />
          
          <Route path="/merge-pdf" element={<ToolPageWrapper><PdfMerge /></ToolPageWrapper>} />
          <Route path="/split-pdf" element={<ToolPageWrapper><PdfSplit /></ToolPageWrapper>} />
          <Route path="/pdf-to-image" element={<ToolPageWrapper><PdfToImage /></ToolPageWrapper>} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}
