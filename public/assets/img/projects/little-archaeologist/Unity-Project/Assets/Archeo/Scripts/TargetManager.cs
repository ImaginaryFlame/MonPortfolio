using UnityEngine;

public class TargetManager : MonoBehaviour
{
    [Header("Settings")]
    [SerializeField] private ObjectSelected objectSelected;
    [SerializeField] private GameObject[] targetPrefab; // The 3D object prefab to instantiate
    [SerializeField] private Transform targetPosition; // Reference to the existing Target Position in the scene
    [SerializeField] private CameraSystem cameraSystem; // Reference to the CameraSystem script

    public GameObject currentTarget; // To store the instantiated 3D object

    private void Start()
    {
        // Instantiate the target automatically on play
        InstantiateNewTarget();
    }

    /// <summary>
    /// Instantiates a new target object and adjusts the hierarchy.
    /// </summary>
    public void InstantiateNewTarget()
    {
        // Destroy the previous target, if it exists
        if (currentTarget != null)
        {
            Destroy(currentTarget);
        }

        // Instantiate the new target object
        currentTarget = Instantiate(targetPrefab[objectSelected.objectIndex], Vector3.zero, targetPrefab[objectSelected.objectIndex].transform.rotation);

        // Re-parent the existing Target Position to the new target object
        targetPosition.SetParent(currentTarget.transform, false);

        // Optionally reset the Target Position's local position and rotation
        targetPosition.localPosition = Vector3.zero;
        targetPosition.localRotation = Quaternion.identity;

        // Notify the CameraSystem about the new target position
        cameraSystem.SetNewTarget(targetPosition);
    }
}
