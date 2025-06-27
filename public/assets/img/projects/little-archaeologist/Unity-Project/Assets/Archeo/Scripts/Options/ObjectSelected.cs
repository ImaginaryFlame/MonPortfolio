using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

[CreateAssetMenu(fileName = "Object Selected", menuName = "Scriptable Objects/Settings/Object Selected")]
public class ObjectSelected : ScriptableObject
{
    public int chapterIndex;
    public int objectIndex;
    public bool isGameLaunched = false;
    public bool[] isVideosWached;
}
