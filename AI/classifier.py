import joblib
import pytesseract
from pdf2image import convert_from_bytes
from collections import Counter

model = joblib.load("Document_Classifier.pkl")

def classify_pdf(file_bytes, required_docs):
    images = convert_from_bytes(file_bytes)
    
    predictions = []
    
    for img in images:
        text = pytesseract.image_to_string(img)
        
        if not text.strip():
            continue
        
        pred = model.predict([text])[0]
        predictions.append(pred)
        
        found = list(set(predictions))
        missing = [doc for doc in required_docs if doc not in found]
        extra = [doc for doc in found if doc not in required_docs]
        
        return {
            "found" : found,
            "missing" : missing,
            "extra" : extra,
            "pages" : predictions,
        }