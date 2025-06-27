using UnityEngine;

public class ImagePinchZoom : MonoBehaviour
{
    public RectTransform imageTransform; 
    public float pinchZoomSensitivity = 0.01f;
    public float minScale = 0.5f;
    public float maxScale = 3f;
    public float panSensitivity = 1f; 

    private bool isPinching = false;
    private Vector2 initialTouch1Pos;
    private Vector2 initialTouch2Pos;
    private Vector2 initialImagePosition;
    private Vector2 initialImageOffset;

    [SerializeField] private TouchInputArea touchInputArea; 


    private void Update()
    {
        if (touchInputArea.IsTouchWithinArea)
        {
            HandleImagePinchZoom();
            HandleImageDragPan();
        }
    }

    private void HandleImagePinchZoom()
    {
        if (Input.touchCount == 2)
        {
            Touch touch1 = Input.GetTouch(0);
            Touch touch2 = Input.GetTouch(1);

            if (!isPinching)
            {
                initialTouch1Pos = touch1.position;
                initialTouch2Pos = touch2.position;
                isPinching = true;
            }
            else
            {
                float prevTouchDeltaMag = (initialTouch1Pos - initialTouch2Pos).magnitude;
                float touchDeltaMag = (touch1.position - touch2.position).magnitude;

                float deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;

                Vector3 newScale = imageTransform.localScale - Vector3.one * deltaMagnitudeDiff * pinchZoomSensitivity;

                newScale.x = Mathf.Clamp(newScale.x, minScale, maxScale);
                newScale.y = Mathf.Clamp(newScale.y, minScale, maxScale);
                newScale.z = 1f; // Ensure the Z scale remains unchanged for 2D

                imageTransform.localScale = newScale;

                initialTouch1Pos = touch1.position;
                initialTouch2Pos = touch2.position;
            }
        }
        else
        {
            isPinching = false;
        }
    }

    private void HandleImageDragPan()
    {
        if (Input.touchCount == 1 && !isPinching)
        {
            Touch touch = Input.GetTouch(0);

            if (touch.phase == TouchPhase.Began)
            {
                initialTouch1Pos = touch.position;
                initialImageOffset = imageTransform.anchoredPosition;
            }
            else if (touch.phase == TouchPhase.Moved)
            {
                Vector2 touchDelta = touch.position - initialTouch1Pos;

                Vector2 newPosition = initialImageOffset + touchDelta * panSensitivity;

                imageTransform.anchoredPosition = newPosition;
            }
        }
    }

}