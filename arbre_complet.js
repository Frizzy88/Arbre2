function init() {

  // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
  // For details, see https://gojs.net/latest/intro/buildingObjects.html
  const $ = go.GraphObject.make;  // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
      {
        "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
        allowCopy: false,
        layout:  // create a TreeLayout for the family tree
          $(go.TreeLayout,
            { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
      });

  var bluegrad = '#90CAF9';
  var pinkgrad = '#F48FB1';

  // Set up a Part as a legend, and place it directly on the diagram
  myDiagram.add(
    $(go.Part, "Table",
      { position: new go.Point(300, 10), selectable: false },
      $(go.TextBlock, "Key",
        { row: 0, font: "500 14px Droid Serif, sans-serif" }),  // end row 0
      $(go.Panel, "Horizontal",
        { row: 1, alignment: go.Spot.Left },
        $(go.Shape, "Rectangle",
          { desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5 }),
        $(go.TextBlock, "Males",
          { font: "500 13px Droid Serif, sans-serif" })
      ),  // end row 1
      $(go.Panel, "Horizontal",
        { row: 2, alignment: go.Spot.Left },
        $(go.Shape, "Rectangle",
          { desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5 }),
        $(go.TextBlock, "Females",
          { font: "500 13px Droid Serif, sans-serif" })
      )  // end row 2
    ));

  // get tooltip text from the object's data
  function tooltipTextConverter(person) {
    var str = "";
    str += "Born: " + person.birthYear;
    if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
    if (person.reign !== undefined) str += "\nReign: " + person.reign;
    return str;
  }

  // define tooltips for nodes
  var tooltiptemplate =
    $("ToolTip",
      { "Border.fill": "whitesmoke", "Border.stroke": "black" },
      $(go.TextBlock,
        {
          font: "bold 8pt Helvetica, bold Arial, sans-serif",
          wrap: go.TextBlock.WrapFit,
          margin: 5
        },
        new go.Binding("text", "", tooltipTextConverter))
    );

  // define Converters to be used for Bindings
  function genderBrushConverter(gender) {
    if (gender === "M") return bluegrad;
    if (gender === "F") return pinkgrad;
    return "orange";
  }

  // replace the default Node template in the nodeTemplateMap
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      { deletable: false, toolTip: tooltiptemplate },
      new go.Binding("text", "name"),
      $(go.Shape, "Rectangle",
        {
          fill: "lightgray",
          stroke: null, strokeWidth: 0,
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center
        },
        new go.Binding("fill", "gender", genderBrushConverter)),
      $(go.TextBlock,
        {
          font: "500 12px Droid Serif, sans-serif",
          textAlign: "center",
          margin: 10, maxSize: new go.Size(80, NaN)
        },
        new go.Binding("text", "name"))
    );

  // define the Link template
  myDiagram.linkTemplate =
    $(go.Link,  // the whole link panel
      { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $(go.Shape, { strokeWidth: 3, stroke: '#424242' }));  // the gray link shape

  // here's the family data
  var nodeDataArray = [
    { key: 0, name: "BIDJECK", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 1, parent: 0, name: "JOB LI BIDJECK", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 2, parent: 0, name: "NJOCK BIDJECK", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 3, parent: 1, name: "BAHIDA BA JOB", gender: "M", birthYear: "1885", deathYear: "1936" },
    { key: 4, parent: 1, name: "JOB LI JOB Jean", gender: "M", birthYear: "1890", deathYear: "1946" },
    { key: 5, parent: 1, name: "NGO DJOB Naemi", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 6, parent: 1, name: "NGO DJOB dite NGO KOMBE", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 7, parent: 1, name: "BIDJECK BI JOB", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 8, parent: 2, name: "YAP NDJOCK", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 9, parent: 2, name: "NDJOCK Thomas", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 10, parent: 2, name: "NDJOCK Sakeo", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 11, parent: 2, name: "NDJOCK", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 12, parent: 2, name: "BIDJECK", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 13, parent: 2, name: "NYEMECK NDJOCK Philippe", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 14, parent: 3, name: "NGO BAHIDA Sapheria", gender: "F", birthYear: "1932", deathYear: "-" },
    { key: 15, parent: 3, name: "MBELECK BAHIDA JOB Daniel Sosthène", gender: "M", birthYear: "1935", deathYear: "2022" },
    { key: 16, parent: 3, name: "BAHIDA NGUENE Joseph", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 17, parent: 3, name: "JOB BAHIDA Jean calvin", gender: "M", birthYear: "1922", deathYear: "1978" },
    { key: 18, parent: 3, name: "NGO BAHIDA Marthe", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 19, parent: 3, name: "BAHIDA Théodore", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 20, parent: 4, name: "JOB Mireille Rose", gender: "F", birthYear: "1925", deathYear: "2008" },
    { key: 21, parent: 4, name: "Djôn Moïse", gender: "M", birthYear: "1924", deathYear: "??" },
    { key: 22, parent: 4, name: "Ngo JOB Hermine", gender: "F", birthYear: "1929", deathYear: "2004" },
    { key: 23, parent: 4, name: "Ngo JOB Colette", gender: "F", birthYear: "1939", deathYear: "1983" },
    { key: 24, parent: 4, name: "JOB Jean Jules", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 25, parent: 4, name: "Ngo JOB Alice", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 26, parent: 4, name: "JOB André Claude", gender: "M", birthYear: "1941", deathYear: "2000" },
    { key: 27, parent: 4, name: "Ngo JOB Suzanne", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 28, parent: 4, name: "Ngo JOB Agathe", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 29, parent: 4, name: "JOB Jean Calvin", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 30, parent: 4, name: "JOB Joseph", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 31, parent: 4, name: "Ngo JOB Cathérine", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 32, parent: 4, name: "Ngo JOB Agnès", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 33, parent: 4, name: "Ngo JOB Rose", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 34, parent: 4, name: "Ngo JOB Simone", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 35, parent: 4, name: "NGO UM Hermine", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 36, parent: 4, name: "YEBGA François", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 37, parent: 4, name: "Ngo JOB Alice", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 38, parent: 4, name: "JOB Jean Jacques", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 39, parent: 4, name: "JOB Simon de Montfort", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 40, parent: 5, name: "NGO NSUMB Rachel", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 41, parent: 5, name: "NSUMB Amos", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 42, parent: 5, name: "LIBOG LI LIBOG Jean Samuel", gender: "M", birthYear: "1936", deathYear: "2007" },
    
    { key: 43, parent: 6, name: "TUK New Sadrack", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 44, parent: 6, name: "JOB Li TUK", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 45, parent: 8, name: "YAP", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 46, parent: 8, name: "NDJOCK YAP", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 47, parent: 10, name: "BASSINGHA Eugene", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 48, parent: 10, name: "NYEMECK Pierre", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 49, parent: 12, name: "BALOG", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 50, parent: 13, name: "NGO YO'O Jeanne", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 51, parent: 14, name: "NGO BAPA Madeleine", gender: "F", birthYear: "1957", deathYear: "??" },
    { key: 52, parent: 14, name: "NGO BAPA Honorine", gender: "F", birthYear: "1959", deathYear: "??" },
    { key: 53, parent: 14, name: "NGO BAPA Cathérine", gender: "F", birthYear: "1961", deathYear: "??" },
    { key: 54, parent: 14, name: "BAPA Raymond Paul", gender: "M", birthYear: "1964", deathYear: "1999" },
    { key: 55, parent: 14, name: "BAPA Théophile", gender: "M", birthYear: "1968", deathYear: "??" },
    
    { key: 56, parent: 15, name: "JOB Déborah Mireille Chantal", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 57, parent: 15, name: "JOB Joseph Théophile", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 58, parent: 15, name: "JOB BAHIDA Amy Marthe Florence", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 59, parent: 15, name: "JOB Jean Calvin", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 60, parent: 15, name: "JOB Madeleine", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 61, parent: 15, name: "DJOB BAHIDA Jean Louis Roger - Emmanuel", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 62, parent: 16, name: "NGO NGUENE Marthe", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 63, parent: 16, name: "HOT NGUENE Antoine Depadoux", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 64, parent: 16, name: "NYOBE NGUENE Pierre Lotti", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 65, parent: 16, name: "NGO NGUENE Marie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 66, parent: 16, name: "MAKON MA NGUENE Louis", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 67, parent: 16, name: "BIDJECK NGUENE Alain Richard", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 68, parent: 16, name: "NGO NGUENE Rose", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 69, parent: 17, name: "JOB Nicole", gender: "F", birthYear: "1956", deathYear: "??" },
    { key: 70, parent: 17, name: "JOB Jeanne Mélanie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 71, parent: 17, name: "JOB BAHIDA Emile Edgard", gender: "M", birthYear: "??", deathYear: "1999" },
    { key: 72, parent: 17, name: "JOB André Alain Felix", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 73, parent: 17, name: "JOB Henri Charles Timoléon", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 74, parent: 18, name: "NGO MANDENG", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 75, parent: 18, name: "NGO JOB", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 76, parent: 18, name: "BAHIDA Lydie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 77, parent: 18, name: "DIWOUTA Daniel", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 78, parent: 19, name: "BAHIDA Philippe", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 79, parent: 19, name: "JOB Georges Raymond", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 80, parent: 19, name: "NGO JOB Flore Delphine", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 81, parent: 19, name: "NGO BAHIDA Marthe Julienne", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 82, parent: 19, name: "JOB BAHIDA Jean Simon", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 83, parent: 20, name: "NJEM Marie Hélène", gender: "F", birthYear: "1958", deathYear: "1975" },
    { key: 84, parent: 20, name: "NJEM Sarah Yolande", gender: "F", birthYear: "1960", deathYear: "1983" },
    { key: 85, parent: 20, name: "JOB Rose Blanche", gender: "F", birthYear: "1945", deathYear: "??" },
    { key: 86, parent: 20, name: "JOB Jean Michel", gender: "M", birthYear: "1951", deathYear: "??" },
    { key: 87, parent: 20, name: "JOB Henri Pierre Nicole Alfred", gender: "M", birthYear: "1955", deathYear: "??" },
    { key: 88, parent: 20, name: "JOB Jean Charles Benjamin", gender: "M", birthYear: "1961", deathYear: "??" },
    
    { key: 89, parent: 23, name: "JOB Marie Rose", gender: "F", birthYear: "1950", deathYear: "??" },
    { key: 90, parent: 23, name: "JOB Jean Claude", gender: "M", birthYear: "1952", deathYear: "1999" },
    
    { key: 91, parent: 24, name: "JOB Gisèle Fidèle", gender: "F", birthYear: "1960", deathYear: "??" },
    { key: 92, parent: 24, name: "JOB Jean Marcel", gender: "M", birthYear: "1965", deathYear: "??" },
    { key: 93, parent: 24, name: "JOB Marie Paule", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 94, parent: 24, name: "NGO DJOB Angèle", gender: "F", birthYear: "1958", deathYear: "1999" },
    { key: 95, parent: 24, name: "JOB Jean Pierre", gender: "M", birthYear: "1961", deathYear: "??" },
    { key: 96, parent: 24, name: "JOB Léopold", gender: "M", birthYear: "1962", deathYear: "??" },
    { key: 97, parent: 24, name: "JOB Joseph", gender: "M", birthYear: "1965", deathYear: "??" },
    { key: 98, parent: 24, name: "JOB Daniel", gender: "M", birthYear: "1967", deathYear: "??" },
    
    { key: 100, parent: 25, name: "JOB MATIP", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 101, parent: 25, name: "NGO MATIP Laure Marie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 102, parent: 25, name: "MATIP", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 103, parent: 25, name: "MATIP MA MATIP Elie", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 104, parent: 25, name: "NGO MATIP Mireille", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 105, parent: 25, name: "NGOS MATIP Jean", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 106, parent: 26, name: "JOB Annie", gender: "F", birthYear: "1985", deathYear: "??" },
    { key: 107, parent: 26, name: "JOB Yolande Nadine", gender: "F", birthYear: "1987", deathYear: "??" },
    { key: 108, parent: 26, name: "JOB Irène Sophie", gender: "F", birthYear: "1970", deathYear: "??" },
    { key: 109, parent: 26, name: "JOB Eric Benoît", gender: "M", birthYear: "1974", deathYear: "2011" },
    { key: 110, parent: 26, name: "JOB Corinne Marianne", gender: "F", birthYear: "1978", deathYear: "??" },

    { key: 111, parent: 27, name: "NGO UM Marlysse", gender: "F", birthYear: "1971", deathYear: "??" },
    { key: 112, parent: 27, name: "BOUM OUM Pierre Henri", gender: "M", birthYear: "1980", deathYear: "??" },
    { key: 113, parent: 27, name: "Minyem", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 114, parent: 27, name: "NGO UM Ruth", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 115, parent: 27, name: "NGO UM Solange", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 116, parent: 27, name: "NGO UM Sidonie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 117, parent: 27, name: "BAHIDA Jean de Dieu", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 118, parent: 27, name: "JOB Alain André", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 119, parent: 27, name: "JOB Patrice", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 120, parent: 28, name: "TOUCK BAHEBEG Harry", gender: "M", birthYear: "1967", deathYear: "??" },
    { key: 121, parent: 28, name: "NDJOBA BAHEBEG Cécile", gender: "F", birthYear: "1969", deathYear: "??" },
    { key: 122, parent: 28, name: "JOB BAHEBEG Martial", gender: "M", birthYear: "1977", deathYear: "??" },
    { key: 123, parent: 28, name: "BAHEBEG Marie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 124, parent: 28, name: "BAHEBEG Fils Calvin", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 125, parent: 29, name: "JOB Patrick Eric", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 126, parent: 29, name: "JOB Joseph Désiré", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 127, parent: 29, name: "JOB Jean Calvin", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 128, parent: 29, name: "JOB Jean Olivier", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 129, parent: 30, name: "Ngo JOB Marie Esther", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 130, parent: 30, name: "NGUE Jean Sadrack", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 131, parent: 30, name: "Ngo JOB Lafortune", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 132, parent: 30, name: "JOB Jean Yves", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 133, parent: 31, name: "JOB Henri Serge", gender: "M", birthYear: "1970", deathYear: "??" },
    
    { key: 134, parent: 34, name: "EONE Rigobert", gender: "M", birthYear: "1963", deathYear: "??" },
    { key: 135, parent: 34, name: "EONE René", gender: "M", birthYear: "1965", deathYear: "??" },
    { key: 136, parent: 34, name: "EONE JOB", gender: "M", birthYear: "1967", deathYear: "??" },
    { key: 137, parent: 34, name: "NGO EONE Michèle", gender: "F", birthYear: "1970", deathYear: "??" },
    { key: 138, parent: 34, name: "EONE Maximilien", gender: "M", birthYear: "1972", deathYear: "??" },
    
    { key: 139, parent: 42, name: "LIBOG Guillaume Augustin", gender: "M", birthYear: "1971", deathYear: "??" },
    { key: 140, parent: 42, name: "NGO LIBOG Marie Eléonore", gender: "F", birthYear: "1975", deathYear: "??" },
    { key: 141, parent: 42, name: "NGO LIBOG Ernestine Céline", gender: "F", birthYear: "1976", deathYear: "??" },
    { key: 142, parent: 42, name: "NGO LIBOG Aline Rachèle", gender: "F", birthYear: "1978", deathYear: "1998" },
    { key: 143, parent: 42, name: "NGO LIBOG Jeanne Simone", gender: "F", birthYear: "1979", deathYear: "??" },
    { key: 144, parent: 42, name: "NGO LIBOG Madeleine Rose", gender: "F", birthYear: "1981", deathYear: "??" },
    { key: 145, parent: 42, name: "JOB LI LIBOG Jean Calvin", gender: "M", birthYear: "1984", deathYear: "??" },
    { key: 146, parent: 42, name: "NGO LIBOG Mireille Naemi", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 147, parent: 42, name: "LIBOG Yvonne Elisabeth", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 148, parent: 42, name: "NGO LIBOG Evelyne Cécile", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 149, parent: 42, name: "LIBOG Félix Eboué Amos", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 150, parent: 47, name: "NGO BASSINGHA Rose", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 151, parent: 47, name: "BASSINGHA Irene", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 152, parent: 47, name: "MBEM Rene", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 153, parent: 47, name: "NDJOCK Sakeo", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 154, parent: 47, name: "NGO BASSINGHA", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 155, parent: 47, name: "NGO BASSINGHA Maria", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 156, parent: 47, name: "JOB LI BASSINGHA Jean Paul", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 157, parent: 47, name: "EOG Simon", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 158, parent: 49, name: "JOB LI BALOG", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 159, parent: 49, name: "NDJOCK BALOG", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 160, parent: 50, name: "NYEMECK Philippe", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 161, parent: 51, name: "BAPA Rodrigue", gender: "M", birthYear: "1978", deathYear: "2000" },
    
    { key: 162, parent: 52, name: "NGO MBOG Marie Thérèse", gender: "F", birthYear: "1985", deathYear: "??" },
    { key: 163, parent: 52, name: "MBOG Michel Frédéric", gender: "M", birthYear: "1996", deathYear: "??" },
    { key: 164, parent: 52, name: "DOOH Pierre Pascal", gender: "M", birthYear: "1982", deathYear: "??" },
    
    { key: 165, parent: 53, name: "NDONGO Guy Cédric", gender: "M", birthYear: "1988", deathYear: "??" },
    { key: 166, parent: 53, name: "NDONGO Jana Francine Laure", gender: "F", birthYear: "1991", deathYear: "??" },
        
    { key: 167, parent: 54, name: "BAPA Talia Simone", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 168, parent: 54, name: "BAPA Paul harold", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 169, parent: 54, name: "BAPA Julienne Tatiana", gender: "F", birthYear: "1995", deathYear: "??" },
    
    { key: 170, parent: 56, name: "JOB Yannick Aimé", gender: "M", birthYear: "1985", deathYear: "??" },
    { key: 171, parent: 56, name: "JOB Marie Johanna C.", gender: "F", birthYear: "1984", deathYear: "??" },
    
    { key: 172, parent: 58, name: "JOB Marie-Ivana Karen", gender: "F", birthYear: "2000", deathYear: "??" },
    
    { key: 173, parent: 61, name: "JOB Marie-Lucresse Alexandra", gender: "F", birthYear: "1999", deathYear: "??" },
    { key: 174, parent: 61, name: "JOB Daniel Frank Junior", gender: "M", birthYear: "2003", deathYear: "??" },
    
    { key: 175, parent: 70, name: "JOB BAHIDA Jean Calvin Stéphane", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 176, parent: 71, name: "JOB Carson", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 177, parent: 71, name: "JOB Jacquelines Laeticia", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 178, parent: 72, name: "JOB Jean Jules Audry", gender: "M", birthYear: "1990", deathYear: "??" },
    { key: 179, parent: 72, name: "JOB Agnès", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 180, parent: 72, name: "JOB Arthur", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 181, parent: 72, name: "JOB Henry", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 182, parent: 73, name: "JOB Agnès Christelle", gender: "F", birthYear: "1988", deathYear: "??" },
    { key: 183, parent: 73, name: "JOB Charles Junior", gender: "M", birthYear: "1989", deathYear: "??" },
    { key: 184, parent: 73, name: "JOB Moïse Hermann", gender: "M", birthYear: "1990", deathYear: "??" },
    { key: 185, parent: 73, name: "JOB Charles Rebecca", gender: "F", birthYear: "1998", deathYear: "??" },

    { key: 186, parent: 77, name: "DIWOUTA", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 187, parent: 77, name: "NGO BAHIDA Julienne", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 188, parent: 77, name: "BAHIDA Marthe Merline", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 189, parent: 77, name: "DIWOUTA Junior", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 190, parent: 78, name: "BAHIDA Eugenie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 191, parent: 78, name: "BAHIDA Reine Cornélie", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 192, parent: 78, name: "BAHIDA Jacky", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 193, parent: 78, name: "BAHIDA Cécile Riphade", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 194, parent: 79, name: "NDJOCK Alice Joëlle", gender: "F", birthYear: "1989", deathYear: "??" },
    { key: 195, parent: 79, name: "BAHIDA Bahida", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 196, parent: 79, name: "BAHIDA Damas", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 197, parent: 80, name: "JOB Calvin Romuald", gender: "M", birthYear: "1989", deathYear: "2022" },
    { key: 198, parent: 80, name: "NGO NDJOCK Marthe Julienne", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 199, parent: 82, name: "JOB BAHIDA Theodore Simplice", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 200, parent: 82, name: "NGO BAHIDA Juliene Diane", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 201, parent: 82, name: "JOB BAHIDA Jean Calvin", gender: "M", birthYear: "1982", deathYear: "??" },
    { key: 202, parent: 82, name: "BAHIDA Idriss Raoul", gender: "M", birthYear: "1987", deathYear: "??" },
    
    { key: 203, parent: 85, name: "COTE Hughes Henri John", gender: "M", birthYear: "1971", deathYear: "??" },
    { key: 204, parent: 85, name: "BISSECK Guillaume Marie", gender: "M", birthYear: "1975", deathYear: "??" },
    { key: 205, parent: 85, name: "BISSECK Marie Hélène", gender: "F", birthYear: "1977", deathYear: "??" },
    { key: 206, parent: 85, name: "BISSECK Pierre Marie", gender: "M", birthYear: "1979", deathYear: "??" },
    { key: 207, parent: 85, name: "BISSECK Michel Philippe", gender: "M", birthYear: "1980", deathYear: "??" },
    { key: 208, parent: 85, name: "BISSECK Marc Henri", gender: "M", birthYear: "1984", deathYear: "??" },
    
    { key: 209, parent: 86, name: "JOB Yves Henri Michel", gender: "M", birthYear: "1972", deathYear: "??" },
    { key: 210, parent: 86, name: "JOB Jean Philippe", gender: "M", birthYear: "1975", deathYear: "2008" },
    { key: 211, parent: 86, name: "JOB Patrick Bea", gender: "M", birthYear: "1977", deathYear: "??" },
    { key: 212, parent: 86, name: "JOB Nelly Cynthia", gender: "F", birthYear: "1979", deathYear: "??" },
    { key: 213, parent: 86, name: "JOB Isabelle Laure", gender: "F", birthYear: "1987", deathYear: "??" },
    { key: 214, parent: 86, name: "JOB Frédéric Charles", gender: "M", birthYear: "1989", deathYear: "??" },
    { key: 215, parent: 86, name: "JOB Frantz Rudolf", gender: "M", birthYear: "1989", deathYear: "??" },
    { key: 216, parent: 86, name: "JOB KAMGA Lima Isabelle", gender: "F", birthYear: "1988", deathYear: "??" },

    { key: 217, parent: 87, name: "JOB Michel yohan Jing", gender: "M", birthYear: "1978", deathYear: "??" },
    { key: 218, parent: 87, name: "JOB Edwin John Maxwell", gender: "M", birthYear: "1980", deathYear: "??" },
    { key: 219, parent: 87, name: "JOB Fabien Yann Paul", gender: "M", birthYear: "1984", deathYear: "??" },
    { key: 220, parent: 87, name: "JOB Yohan-Hélène", gender: "F", birthYear: "1998", deathYear: "??" },
    { key: 221, parent: 87, name: "JOB Ian", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 222, parent: 88, name: "JOB Laetitia André Cynthia", gender: "F", birthYear: "1980", deathYear: "??" },
    { key: 223, parent: 88, name: "JOB Natacha Anne Blanche", gender: "F", birthYear: "1983", deathYear: "??" },
    { key: 224, parent: 88, name: "JOB Elisabeth Malaïka Zélia", gender: "F", birthYear: "1989", deathYear: "??" },
    { key: 225, parent: 88, name: "JOB Yolande Sally", gender: "F", birthYear: "1991", deathYear: "??" },
    { key: 226, parent: 88, name: "JOB Jean Charles, johnny", gender: "M", birthYear: "1992", deathYear: "??" },
    { key: 227, parent: 88, name: "JOB Kiera Yane Rose", gender: "F", birthYear: "2005", deathYear: "??" },

    { key: 228, parent: 91, name: "NGO BAKONGO Emilie Arianne", gender: "F", birthYear: "1984", deathYear: "??" },
    { key: 229, parent: 91, name: "BAKONGO Simon Lionel", gender: "M", birthYear: "1985", deathYear: "??" },
    { key: 230, parent: 91, name: "NGO BAKONGO Céline Yolaine", gender: "F", birthYear: "1989", deathYear: "??" },
    { key: 231, parent: 91, name: "NGO BAKONGO July Christelle", gender: "F", birthYear: "1993", deathYear: "??" },

    { key: 232, parent: 92, name: "JOB Maeva Ange Julie", gender: "F", birthYear: "2004", deathYear: "??" },
    { key: 233, parent: 92, name: "JOB Billy Jules", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 234, parent: 94, name: "JOB Njeba Alfred Lionel", gender: "M", birthYear: "1985", deathYear: "??" },
    { key: 235, parent: 94, name: "JOB Stephan", gender: "M", birthYear: "1989", deathYear: "??" },
    { key: 236, parent: 94, name: "MBABI Jean Michel", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 237, parent: 94, name: "NGWAYI Bernard", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 238, parent: 107, name: "André Jérémie", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 239, parent: 107, name: "William Phoenix", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 240, parent: 121, name: "BASSIME Julie Petra", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 241, parent: 40, name: "NGO TJOCK Mireille Naemi", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 242, parent: 140, name: "NANA DJIKE Léa Julia Gailla", gender: "F", birthYear: "1998", deathYear: "??" },
    { key: 243, parent: 140, name: "NANA DJIKE Daronne", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 244, parent: 140, name: "NANA DJIKE Samuel", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 245, parent: 140, name: "NANA DJIKE Madeleine", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 246, parent: 142, name: "JOB Jean Emile Lotti", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 247, parent: 145, name: "JOB LI LIBOG Samuel Louis Curtis", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 248, parent: 145, name: "JOB LI LIBOG Celya Naemie", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 249, parent: 147, name: "BASSOG Libyh Paul Ryan", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 250, parent: 148, name: "LIBOG Félix Maxime Berthold", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 251, parent: 149, name: "LIBOG Jean Joseph", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 252, parent: 149, name: "LIBOG Laetitia Laure Lea", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 253, parent: 166, name: "Khloé", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 254, parent: 166, name: "Maelys", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 255, parent: 170, name: "JOB Eirine Peace Déborah", gender: "F", birthYear: "2016", deathYear: "??" },
    { key: 256, parent: 170, name: "JOB Ayden Chrismaëlys", gender: "F", birthYear: "2018", deathYear: "??" },
    { key: 257, parent: 170, name: "NJOH JOB Etienne Yannick", gender: "M", birthYear: "2019", deathYear: "??" },
    { key: 258, parent: 171, name: "Alisha", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 259, parent: 171, name: "Emeraude", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 260, parent: 173, name: "Une fille ??", gender: "F", birthYear: "2021", deathYear: "??" },

    { key: 261, parent: 202, name: "Jephté", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 262, parent: 213, name: "FOULQUIER Anne-Marie", gender: "F", birthYear: "2017", deathYear: "??" },
    { key: 263, parent: 213, name: "FOULQUIER Zélie Heidi", gender: "F", birthYear: "2019", deathYear: "??" },
    
    { key: 264, parent: 211, name: "JOB Owen Kito", gender: "M", birthYear: "2006", deathYear: "??" },
    { key: 265, parent: 211, name: "JOB Neela", gender: "F", birthYear: "2009", deathYear: "??" },
    { key: 266, parent: 211, name: "JOB Aïdan", gender: "M", birthYear: "2013", deathYear: "??" },
    
    { key: 267, parent: 217, name: "Une fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 268, parent: 217, name: "Un garçon ??", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 269, parent: 218, name: "Une fille ??", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 270, parent: 228, name: "Kelia", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 271, parent: 231, name: "Léana", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 272, parent: 231, name: "Dayana", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 273, parent: 234, name: "Salvador", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 274, parent: 234, name: "Stephan", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 275, parent: 38, name: "MBAGA André Claude", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 276, parent: 275, name: "JOB MBAGA Marie Blanche", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 277, parent: 275, name: "GWETH MBAGA Yoan Joseph", gender: "M", birthYear: "??", deathYear: "??" },
    
    { key: 278, parent: 222, name: "TARDIEU BAEZA Alexandre Vincent Nicolas", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 279, parent: 222, name: "TARDIEU BAEZA Luc-André Dominique", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 280, parent: 222, name: "TARDIEU BAEZA Biley Loalwa Scarlet-Angel", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 281, parent: 225, name: "ELOUNDOU Elena Solange Crescence", gender: "F", birthYear: "2019", deathYear: "??" },
    
    { key: 282, parent: 224, name: "IMOMA James", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 283, parent: 224, name: "IMOMA Jason", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 284, parent: 224, name: "IMOMA Cloé", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 285, parent: 203, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 286, parent: 203, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },

    { key: 287, parent: 204, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 288, parent: 204, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 289, parent: 209, name: "JOB Erwan", gender: "M", birthYear: "1996", deathYear: "??" },
    { key: 290, parent: 209, name: "JOB Guewin", gender: "M", birthYear: "1998", deathYear: "??" },
    
    { key: 291, parent: 214, name: "JOB Louis Ebwadu", gender: "M", birthYear: "2018", deathYear: "??" },
    
    { key: 292, parent: 216, name: "YAMSI JOB Gabe-Denzel Manaël", gender: "M", birthYear: "2021", deathYear: "??" },
    
    { key: 293, parent: 112, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 294, parent: 112, name: "Un Garçon ??", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 295, parent: 112, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 296, parent: 112, name: "Un Garçon ??", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 297, parent: 112, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 298, parent: 112, name: "Un Garçon ??", gender: "M", birthYear: "??", deathYear: "??" },

    { key: 299, parent: 133, name: "Une Fille ??", gender: "F", birthYear: "??", deathYear: "??" },
    
    { key: 300, parent: 33, name: "JOB Marie Hélène", gender: "F", birthYear: "1997", deathYear: "??" },

    { key: 301, parent: 300, name: "JOB BEKOK Sangal Mankay", gender: "M", birthYear: "2004", deathYear: "??" },
    { key: 302, parent: 300, name: "MASSE MA MOUAHA II Fils", gender: "M", birthYear: "??", deathYear: "??" },
    { key: 303, parent: 300, name: "NGO SANDA Faith Maria Bénédicta", gender: "F", birthYear: "??", deathYear: "??" },
    { key: 304, parent: 300, name: "MASOADA MA NWAHA", gender: "M", birthYear: "??", deathYear: "??" },

  ];

  // create the model for the family tree
  myDiagram.model = new go.TreeModel(nodeDataArray);

  document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.commandHandler.zoomToFit());

  document.getElementById('centerRoot').addEventListener('click', () => {
    myDiagram.scale = 1;
    myDiagram.scrollToRect(myDiagram.findNodeForKey(0).actualBounds);
  });

}
window.addEventListener('DOMContentLoaded', init);