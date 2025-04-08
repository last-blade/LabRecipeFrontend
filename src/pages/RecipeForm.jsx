"use client";

import { useState, useEffect } from "react";
import { Shirt, Package, Hash, FileText, Palette } from "lucide-react";
import { useRecipeForm } from "../hooks/useRecipeForm";
import Card, { CardHeader, CardBody } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import TextArea from "../components/ui/TextArea";
import DatePicker from "../components/ui/DatePicker";
import Button from "../components/ui/Button";
import { SketchPicker } from "react-color";
import { useParams } from "react-router-dom";
import axios from "../lib/axios"; // Axios wrapper with base URL

const partyOptions = [
  { value: "Party1", label: "Party 1" },
  { value: "Party2", label: "Party 2" },
  { value: "Party3", label: "Party 3" },
];

const fabricOptions = [
  { value: "cotton", label: "Cotton" },
  { value: "polyester", label: "Polyester" },
  { value: "silk", label: "Silk" },
  { value: "wool", label: "Wool" },
];

const RecipeForm = () => {
  const { recipeId } = useParams();

  const {
    form: {
      register,
      formState: { errors },
      setValue,
      watch,
    },
    handleSubmit, // ✅ comes from hook return
    resetForm,
    isLoading,
    isEditing,
  } = useRecipeForm();

  const [selectedDate, setSelectedDate] = useState(null);
  const [colors, setColors] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("date", date);
  };

  const handleColorChange = (color, index) => {
    const updatedColors = [...colors];
    updatedColors[index] = color.hex;
    setColors(updatedColors);
    setValue(`color${index + 1}`, color.hex);
  };

  useEffect(() => {
    const date = watch("date");
    if (
      date &&
      (!selectedDate ||
        new Date(date).getTime() !== new Date(selectedDate).getTime())
    ) {
      setSelectedDate(new Date(date));
    }
  }, [watch("date")]);

  const onSubmit = (data) => {
    if (recipeId) {
      updateRecipe(recipeId, data);
    } else {
      createRecipe(data);
    }
  };

  const handleColorInputChange = (e, index) => {
    const newColors = [...colors];
    newColors[index] = e.target.value;
    setColors(newColors);
  };

  // const handleColorChange = (color, index) => {
  //   const newColors = [...colors];
  //   newColors[index] = color.hex;
  //   setColors(newColors);
  // };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Edit Lab Recipe" : "Create Lab Recipe"}
          </h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Party Name"
                name="partyName"
                options={partyOptions}
                placeholder="Select Party"
                icon={Package}
                error={errors.partyName?.message}
                {...register("partyName")}
              />

              <Select
                label="Fabric Name"
                name="fabricName"
                options={fabricOptions}
                placeholder="Select Fabric"
                icon={Shirt}
                error={errors.fabricName?.message}
                {...register("fabricName")}
              />

              <Input
                label="Lot No"
                name="lotNo"
                placeholder="Enter Lot Number"
                icon={Hash}
                error={errors.lotNo?.message}
                {...register("lotNo")}
              />

              <Input
                label="Register Number"
                name="registerNo"
                placeholder="Enter Register Number"
                icon={FileText}
                error={errors.registerNo?.message}
                {...register("registerNo")}
              />

              <Input
                label="Shade"
                name="shade"
                placeholder="Enter Shade"
                icon={Palette}
                error={errors.shade?.message}
                {...register("shade")}
              />

              <DatePicker
                label="Date"
                name="date"
                selected={selectedDate}
                onChange={handleDateChange}
                error={errors.date?.message}
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
                      error={errors[`color${index + 1}`]?.message}
                      onChange={(e) => handleColorInputChange(e, index)}
                    />

                    <SketchPicker
                      color={colors[index]}
                      onChangeComplete={(color) =>
                        handleColorChange(color, index)
                      }
                    />
                    <Input
                      type="number"
                      step="any"
                      min={0}
                      max={100}
                      label={`Percentage ${index + 1}`}
                      name={`percentage${index + 1}`}
                      placeholder="Enter Percentage"
                      error={errors[`percentage${index + 1}`]?.message}
                      {...register(`percentage${index + 1}`, {
                        required: "This field is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          (value >= 0 && value <= 100) ||
                          "Enter a value between 0 and 100",
                      })}
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
                error={errors.remarks?.message || "This field is required"}
                {...register("remarks", { required: "This field is required" })}
              />
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Brief description or notes about the recipe.
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {!isEditing ? (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Reset
                </Button>
              ) : (
                ""
              )}

              <Button type="submit" variant="primary" isLoading={isLoading}>
                {isEditing ? "Update Recipe" : "Save Recipe"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default RecipeForm;
