using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName  = "Options", menuName = "Scriptable Objects/Settings/Game Settings")]
public class Options : ScriptableObject
{
    public Language language;
    public ZoomMethod zoomMethod;
    public int rotationSensibility;
    public int zoomSensibility;
}
