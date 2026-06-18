#!/usr/bin/env -S dotnet fsi
open System.IO

type Image = {
    Png: FileInfo Option
    Clip: FileInfo Option
}

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
[<RequireQualifiedAccess>]
module Image =
    let empty = {
        Png = None
        Clip = None
    }

    let setFile (file: FileInfo) state =
        match file.Extension.ToLower() with
        | ".png" ->
            { state with
                Png = Some file
            }
        | ".clip" ->
            { state with
                Clip = Some file
            }
        | _ -> state

type Images = Image list

[<CompilationRepresentation(CompilationRepresentationFlags.ModuleSuffix)>]
[<RequireQualifiedAccess>]
module Images =
    let fromDir sourcesDir : Images =
        DirectoryInfo(sourcesDir).EnumerateFiles()
        |> Seq.map (fun file ->
            let fileName =
                Path.GetFileNameWithoutExtension file.Name
            fileName, file
        )
        |> Seq.groupBy fst
        |> Seq.map (fun (_, xs) ->
            xs
            |> Seq.fold
                (fun state (_, file) ->
                    Image.setFile file state
                )
                Image.empty
        )
        |> List.ofSeq

    // удалить, если есть `.clip`

let imageSourcesDir = "src/items"
let imageDestinationDir = "public/items"

Images.fromDir imageSourcesDir |> printfn "%A"

