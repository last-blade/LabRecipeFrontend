"use client";

import { useState, useEffect } from "react";
import { Shirt, Package, Hash, FileText, Palette } from "lucide-react";
import Card, { CardHeader, CardBody } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import DatePicker from "../components/ui/DatePicker";
import { SketchPicker } from "react-color";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";

const ViewRecipe = () => {
  const { recipeId } = useParams();

  const [formData, setFormData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [colors, setColors] = useState([
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recipeId) {
      axios
        .get(`/api/v1/recipe/view-recipe/${recipeId}`)
        .then((res) => {
          const data = res.data?.data;

          if (data) {
            setFormData(data);

            if (data.date) setSelectedDate(new Date(data.date));

            setColors([
              data.color1 || "#ffffff",
              data.color2 || "#ffffff",
              data.color3 || "#ffffff",
              data.color4 || "#ffffff",
            ]);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch recipe:", err);
          setError("Failed to load recipe details.");
          setLoading(false);
        });
    }
  }, [recipeId]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading recipe details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recipe Details
          </h1>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Party Name"
              name="partyName"
              placeholder="Party Name"
              icon={Package}
              disabled
              value={formData?.partyName || ""}
            />

            <Input
              label="Fabric Name"
              name="fabricName"
              placeholder="Fabric Name"
              icon={Shirt}
              disabled
              value={formData?.fabricName || ""}
            />

            <Input
              label="Lot No"
              name="lotNo"
              placeholder="Enter Lot Number"
              icon={Hash}
              disabled
              value={formData?.lotNo || ""}
            />

            <Input
              label="Register Number"
              name="registerNo"
              placeholder="Enter Register Number"
              icon={FileText}
              disabled
              value={formData?.registerNo || ""}
            />

            <Input
              label="Shade"
              name="shade"
              placeholder="Enter Shade"
              icon={Palette}
              disabled
              value={formData?.shade || ""}
            />

            <DatePicker
              label="Date"
              name="date"
              selected={selectedDate}
              onChange={() => {}}
              disabled
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 dark:text-white">
              Color Composition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <Input
                    type="text"
                    label={`Color ${index + 1}`}
                    name={`color${index + 1}`}
                    value={colors[index]}
                    placeholder="Enter Color"
                    disabled
                  />

                  {/* Optional: Uncomment to show the color picker in readonly */}
                  {/* <div className="pointer-events-none opacity-50">
                    <SketchPicker
                      color={colors[index]}
                      onChangeComplete={() => {}}
                      disableAlpha
                      presetColors={[]}
                    />
                  </div> */}

                  <Input
                    type="string"
                    step="any"
                    min={0}
                    max={100}
                    label={`Percentage ${index + 1}`}
                    name={`percentage${index + 1}`}
                    value={
                      formData?.[`percentage${index + 1}`] !== undefined
                        ? formData[`percentage${index + 1}`]
                        : ""
                    }
                    placeholder="Enter Percentage"
                    disabled
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <TextArea
              label="Remarks"
              name="remarks"
              placeholder="Enter any additional remarks or notes"
              rows={4}
              disabled
              value={formData?.remarks || ""}
            />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Brief description or notes about the recipe.
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewRecipe;