using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Cinemachine;

public class CameraSystem : MonoBehaviour
{
    [SerializeField] private TouchInputArea touchInputArea; // Reference to the input area script

    [Header("Movement")]
    [SerializeField] string horizontalInputMovment = "Horizontal Movment";
    [SerializeField] string verticalInputMovment = "Vertical Movment";
    [SerializeField] string heightInputMovment = "Height Movment";
    [SerializeField] float moveSpeed;
    [SerializeField] bool useEdgeScrolling;
    private Transform cameraTargetPosition;

    [Header("Drag Pan Movement")]
    [SerializeField] bool useDragPanMovment;
    [SerializeField] float dragPanMovmentSpeed;
    private bool dragPanMovmentActive;
    private Vector2 lastMousePos;

    [Header("Rotation")]
    [SerializeField] string horizontalInputRotation = "Horizontal Rotation";
    [SerializeField] string verticalInputRotation = "Vertical Rotation";
    [SerializeField] float rotationSpeed;

    [Header("Drag Pan Rotation")]
    [SerializeField] bool useDragPanRotatoion;
    [SerializeField] float dragPanRotationSpeed;
    private bool dragPanRotationActive;

    [Header("Zoom")]
    [SerializeField] CinemachineVirtualCamera cinemachineVirtualCamera;
    [SerializeField] float zoomSpeed;
    [Header("Zoom with Follow Offset")]
    [SerializeField] string zoomInput = "Zoom";
    [SerializeField] float maxFollowOffset;
    [SerializeField] float minFollowOffset;
    [SerializeField] float zoomAmountDivider;
    [SerializeField] Vector3 followOffset;
    [SerializeField] Vector3 defaultFollowOffset;
    [SerializeField] private float pinchZoomSensitivity = 0.1f; // Sensitivity for pinch zoom

    private float pinchStartTime; // Track when the first finger was placed
    private const float timeThreshold = 0.3f; // 300ms grace period
    private bool isPinching = false; // Tracks whether a pinch gesture is active
    private Vector2 initialTouch1Pos, initialTouch2Pos; // Initial positions of the two fingers

    private Quaternion defaultRotation;
    private GameObject currentTargetObject; // Holds the current instantiated object

    private void Awake()
    {
        cinemachineVirtualCamera.GetCinemachineComponent<CinemachineTransposer>().m_FollowOffset = defaultFollowOffset;
        followOffset = defaultFollowOffset;
        cameraTargetPosition = transform.parent;
    }

    void Start()
    {
        defaultRotation = cameraTargetPosition.rotation;
    }

    void Update()
    {
        if (touchInputArea.IsTouchWithinArea){
            HandleCameraMovment();
            if (useEdgeScrolling) HandleCameraMovmentEdgeScrolling();
            if (useDragPanMovment) HandleCameraMovmentDragPan();

            HandleCameraRotation();
            if (useDragPanRotatoion) HandleCameraRotationDragPan();

            HandleCameraZoom_MoveForward();
            HandlePinchZoom();
        }
    }

    public void SetNewTarget(Transform newTargetPosition)
    {
        cameraTargetPosition = newTargetPosition; // Update the camera's target position
        ResetCameraTargetPositionAndRotation();  // Reset the camera to the new target
    }

    #region Dynamic Target Loading

    /// <summary>
    /// Dynamically loads a 3D object and sets it as the target for the camera system.
    /// </summary>
    /// <param name="newTargetPrefab">The prefab of the object to instantiate.</param>
    public void LoadNewTarget(GameObject newTargetPrefab)
    {
        if (currentTargetObject != null)
        {
            Destroy(currentTargetObject); // Remove the existing target object
        }

        // Instantiate the new target object
        currentTargetObject = Instantiate(newTargetPrefab);

        // Set up the target position and rotation
        Transform targetPositionTransform = new GameObject("Target Position").transform;
        targetPositionTransform.SetParent(currentTargetObject.transform, false);

        Transform targetRotationTransform = new GameObject("Target Rotation").transform;
        targetRotationTransform.SetParent(targetPositionTransform, false);

        // Update the camera system references
        cameraTargetPosition = targetPositionTransform;
        cinemachineVirtualCamera.Follow = targetRotationTransform;

        // Reset camera position and rotation
        ResetCameraTargetPositionAndRotation();
    }

    #endregion

    private void HandleCameraMovment()
    {
        Vector3 inputDir = new Vector3(0, 0, 0);

        inputDir.z = -Input.GetAxis(verticalInputMovment) / 2;
        inputDir.x = -Input.GetAxis(horizontalInputMovment) / 2;
        inputDir.y = Input.GetAxis(heightInputMovment) / 4;

        Vector3 moveDir = transform.forward * inputDir.z + transform.up * inputDir.y + transform.right * inputDir.x;
        transform.position += moveDir * moveSpeed * Time.deltaTime;
    }

    private void HandleCameraMovmentEdgeScrolling()
    {
        Vector3 inputDir = new Vector3(0, 0, 0);
        int edgeScrollSize = 20;

        if (Input.mousePosition.x < edgeScrollSize) inputDir.x = +1;
        if (Input.mousePosition.y < edgeScrollSize) inputDir.z = +1;
        if (Input.mousePosition.x > Screen.width - edgeScrollSize) inputDir.x = -1;
        if (Input.mousePosition.y > Screen.height - edgeScrollSize) inputDir.z = -1;

        Vector3 moveDir = transform.forward * inputDir.z + transform.right * inputDir.x;
        transform.position += moveDir * Time.deltaTime;
    }
    private void HandlePinchZoom()
{
    if (Input.touchCount == 2)
    {
        Touch touch1 = Input.GetTouch(0);
        Touch touch2 = Input.GetTouch(1);

        if (!isPinching)
        {
            // If not already pinching, initialize pinch gesture
            initialTouch1Pos = touch1.position;
            initialTouch2Pos = touch2.position;
            isPinching = true;
        }
        else
        {
            // Calculate the previous and current distance between the touches
            float prevTouchDeltaMag = (initialTouch1Pos - initialTouch2Pos).magnitude;
            float touchDeltaMag = (touch1.position - touch2.position).magnitude;

            // Calculate the difference in distances and adjust zoom
            float deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;

            Vector3 zoomDir = followOffset.normalized;
            followOffset += zoomDir * deltaMagnitudeDiff * pinchZoomSensitivity;

            // Clamp the zoom level
            float followOffsetMagnitude = Mathf.Clamp(followOffset.magnitude, minFollowOffset, maxFollowOffset);
            followOffset = zoomDir * followOffsetMagnitude;

            // Apply the updated follow offset
            cinemachineVirtualCamera.GetCinemachineComponent<CinemachineTransposer>().m_FollowOffset = followOffset;

            // Update initial positions for the next frame
            initialTouch1Pos = touch1.position;
            initialTouch2Pos = touch2.position;
        }
    }
    else
    {
        // Reset pinch state when fewer than two fingers are on the screen
        isPinching = false;
    }
}

    private void HandleCameraMovmentDragPan()
    {
        Vector3 inputDir = new Vector3(0, 0, 0);

        if (Input.GetMouseButtonDown(1))
        {
            dragPanMovmentActive = true;
            lastMousePos = Input.mousePosition;
        }
        if (Input.GetMouseButtonUp(1))
        {
            dragPanMovmentActive = false;
            Cursor.visible = true;
        }

        if (dragPanMovmentActive)
        {
            Cursor.visible = false;
            Vector2 mouseMovmentDelta = (Vector2)Input.mousePosition - lastMousePos;

            inputDir.x = -mouseMovmentDelta.x * dragPanMovmentSpeed;
            inputDir.z = -mouseMovmentDelta.y * dragPanMovmentSpeed;

            lastMousePos = Input.mousePosition;
        }

        Vector3 moveDir = transform.forward * inputDir.z + transform.right * inputDir.x;
        transform.position += moveDir * moveSpeed * Time.deltaTime;
    }

    private void HandleCameraRotation()
    {
        if (isPinching) return; // Skip rotation if pinch zoom is active

        float horizontalRotationDir = -Input.GetAxis(horizontalInputRotation);
        float verticalRotationDir = Mathf.Clamp(-Input.GetAxis(verticalInputRotation), -60f, 40f);

        cameraTargetPosition.eulerAngles += new Vector3(verticalRotationDir / 1.5f, horizontalRotationDir, 0) * rotationSpeed * 15f * Time.deltaTime;
    }


    //private void HandleCameraRotationDragPan()
    //{
    //    if (Input.GetMouseButtonDown(0))
    //    {
    //        dragPanRotationActive = true;
    //        lastMousePos = Input.mousePosition;
    //    }
    //    if (Input.GetMouseButtonUp(0))
    //    {
    //        dragPanRotationActive = false;
    //        Cursor.visible = true;
    //    }

    //    if (dragPanRotationActive)
    //    {
    //        Cursor.visible = false;
    //        Vector2 mouseMovmentDelta = (Vector2)Input.mousePosition - lastMousePos;

    //        cameraTargetPosition.eulerAngles += new Vector3(mouseMovmentDelta.y / 1.5f, mouseMovmentDelta.x, 0) * dragPanRotationSpeed * Time.deltaTime;

    //        lastMousePos = Input.mousePosition;
    //    }
    //}

    private void HandleCameraRotationDragPan()
    {
        if (Input.touchCount == 1) // One-finger swipe for rotation
        {
            Touch touch = Input.GetTouch(0);

            if (touch.phase == TouchPhase.Began)
            {
                dragPanRotationActive = true;
                lastMousePos = touch.position;
            }
            else if (touch.phase == TouchPhase.Moved && dragPanRotationActive)
            {
                Vector2 touchDelta = touch.deltaPosition;

                float rotationY = touchDelta.x * dragPanRotationSpeed * Time.deltaTime;
                float rotationX = touchDelta.y * dragPanRotationSpeed * Time.deltaTime; 

                cameraTargetPosition.Rotate(Vector3.up, rotationY, Space.World);
                cameraTargetPosition.Rotate(Vector3.right, rotationX, Space.Self);
            }
            else if (touch.phase == TouchPhase.Ended)
            {
                dragPanRotationActive = false;
            }
        }
    }



    private void HandleCameraZoom_MoveForward()
    {
        Vector3 zoomDir = followOffset.normalized;

        followOffset -= Input.mouseScrollDelta.y * zoomDir / zoomAmountDivider;
        followOffset = zoomDir * Mathf.Clamp(followOffset.magnitude, minFollowOffset, maxFollowOffset);

        cinemachineVirtualCamera.GetCinemachineComponent<CinemachineTransposer>().m_FollowOffset = Vector3.Lerp(
            cinemachineVirtualCamera.GetCinemachineComponent<CinemachineTransposer>().m_FollowOffset,
            followOffset,
            zoomSpeed * Time.deltaTime
        );
    }

    public void ResetCameraTargetPositionAndRotation()
    {
        transform.position = cameraTargetPosition.position;
        cameraTargetPosition.rotation = defaultRotation;
        followOffset = defaultFollowOffset;

        cinemachineVirtualCamera.GetCinemachineComponent<CinemachineTransposer>().m_FollowOffset = followOffset;
    }

}
