using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class TouchInputArea : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    [SerializeField] private RectTransform inputArea; // The UI area to detect touch input
    private bool isTouchWithinArea = false; // Tracks if touch is inside the UI area

    public bool IsTouchWithinArea => isTouchWithinArea; // Public getter for the state

    void Update()
    {
        if (isTouchWithinArea)
        {
            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                // Handle the touch input within the area
                if (touch.phase == TouchPhase.Moved || touch.phase == TouchPhase.Stationary)
                {
                    Debug.Log("Touch Input Detected in Area");
                    // Add rotation or other functionality here
                }
            }
        }
    }

    // Event triggered when the pointer enters the input area
    public void OnPointerEnter(PointerEventData eventData)
    {
        isTouchWithinArea = true;
    }

    // Event triggered when the pointer exits the input area
    public void OnPointerExit(PointerEventData eventData)
    {
        isTouchWithinArea = false;
    }
}
