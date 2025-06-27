using UnityEngine;
using UnityEngine.SceneManagement;

public class ObjectViewer : MonoBehaviour
{
    [SerializeField] private GameObject measureUI;
    [SerializeField] private TargetManager targetManager;
    [SerializeField] private GameObject buttons;
    private bool isClicked = false;
    public void BackToMenu()
    {
        SceneManager.LoadScene("Audric");
    }

    public void Measure()
    {
        // Toggle MeasureUI visibility
        if (!isClicked)
        {
            isClicked = true;
            measureUI.SetActive(isClicked);
            targetManager.currentTarget.SetActive(false);
            buttons.SetActive(false);
        }
        else
        {
            Debug.LogWarning("MeasureUI is not assigned!");
        }
        isClicked = !isClicked;
    }

    public void OnMeasureExit()
    {
        measureUI.SetActive(false);
        targetManager.currentTarget.SetActive(true);
        buttons.SetActive(true);   
    }
}
