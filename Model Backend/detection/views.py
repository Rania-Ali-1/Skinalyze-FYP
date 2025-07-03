from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import tensorflow as tf
import numpy as np
from PIL import Image

# Model Path
MODEL_PATH = r"C:\Users\Rania\Downloads\densenet201_V1_epoch_02.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Define the class labels
generator_classes = [
    "Seborrheic Keratoses and other Benign Tumors",
    "acne",
    "acne_scars",
    "eczema",
    "melasma",
    "psoriasis",
    "ringworm",
    "rosacea"
]

@csrf_exempt  # Disable CSRF protection for testing
def detect_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        # Load and preprocess image
        image = Image.open(request.FILES['image']).convert("RGB")
        image = image.resize((224, 224))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)

        # Get model prediction
        prediction = model.predict(image)
        predicted_index = np.argmax(prediction)  # Get index of highest probability
        predicted_label = generator_classes[predicted_index]  # Map index to class name

        # Return response
        return JsonResponse({
            "prediction": predicted_label,
            "confidence": float(np.max(prediction))  # Send confidence score
        })

    return JsonResponse({"error": "Invalid request"}, status=400)

