import pdfplumber
import io

class PDFService:
    @staticmethod
    def extract_text_from_pdf(file_content: bytes) -> str:
        """
        Extracts all text from a PDF file provided as bytes.
        """
        text = ""
        try:
            with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            return text.strip()
        except Exception as e:
            raise Exception(f"Error parsing PDF: {str(e)}")

pdf_service = PDFService()
